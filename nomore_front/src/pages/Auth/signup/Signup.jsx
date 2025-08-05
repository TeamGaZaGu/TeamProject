/** @jsxImportSource @emotion/react */
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';

function Signup(props) {
  const categories= useCategoryQuery();
  const categoryList = (categories.data?.data || []).filter(category => category.categoryName !== '전체');
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); 
  const [ buttonDisabled, setButtonDisabled ] = useState(true);
  const SIGNUP_REGEX = {
    nickName: /^[a-zA-Z0-9가-힣]{2,15}$/,
    fullName: /^[가-힣]{2,10}$/,
    birthDate: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    notEmpty: /^.+$/,
  }
  
  const SIGNUP_REGEX_ERROR_MESSAGE = {
    nickName: "닉네임은 2~15자 사이의 한글, 영어, 숫자만 가능합니다.",
    fullName: "이름은 2~10자의 한글만 입력해주세요.",
    birthDate: "생년월일은 YYYY-MM-DD 형식으로 정확히 입력해주세요." 
  }

  const [ helpText, setHelpText ] = useState({
    nickName: "",
    fullName: "",
    birthDate: "",
  });

  const [ inputValue, setInputValue ] = useState({
    nickName: "",
    fullName: "",
    birthDate: "",
    gender: "male", 
    category: "",
  }) 

  const [ error, setError ] = useState({
    nickName: false,
    fullName: false,
    birthDate: false,
  });

  useEffect(() => {
      const isEmptyValue = !!Object.values(inputValue).filter(value => !value.trim()).length;
      const isError = !!Object.values(error).filter(value => !!value).length;
      setButtonDisabled(isEmptyValue || isError);

      const errorEntries = Object.entries(error);
      errorEntries.forEach(([key, value]) => {
          setHelpText(prev => ({
              ...prev,
              [key]: !value ? "" : SIGNUP_REGEX_ERROR_MESSAGE[key],
          }));
      });
    }, [error]);

  const handleToggleCategoryOnClik = () => {
    setIsCategoryOpen((prev) => !prev);
    if (isCategoryOpen) {
        setIsCategoryOpen(false);
    }

    if (categoryList.length === 0) {
        categoryList();
    }
  }

  const handleCategoryOnChange = (e) => {
    setSelectedCategory(e.target.value);
    setIsCategoryOpen(false);
  }

  const handleSignupRegOnClick = () => {

  }

  const handleOnChange = (e) => {
    setInputValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

    if (!SIGNUP_REGEX.hasOwnProperty(e.target.name)) {
          setError(prev => ({
              ...prev,
              [e.target.name]: false,
          }));
          return;
     }

    if (!SIGNUP_REGEX["notEmpty"].test(e.target.value)) {
          setError(prev => ({
              ...prev,
              [e.target.name]: false,
          }));
          return;
      }

      setError(prev => ({
          ...prev,
          [e.target.name]: !SIGNUP_REGEX[e.target.name].test(e.target.value),
      }))
    } 
 

  return (
    <div css={s.layout}>
      <h1>회원가입</h1>
      <div css={s.inputContainer}>
        <div>
          <input type="text" name='nickName' value={inputValue.nickName} onChange={handleOnChange} placeholder="닉네임" css={s.inputStyle} />
          {
            error.nickName && 
            <p>{helpText.nickName}</p>
          }
        </div>
        <input type="email" placeholder="email" onChange={handleOnChange} css={s.inputStyle} />
        <div>
          <input type="text" name='fullName' placeholder="이름" onChange={handleOnChange} css={s.inputStyle} />
          {
            error.fullName && 
            <p>{helpText.fullName}</p>
          }
        </div>
        <div>
          <input type="text" name='birthDate' value={inputValue.birthDate} placeholder="생년월일" onChange={handleOnChange} css={s.inputStyle} />
          {
            error.birthDate &&
            <p>{helpText.birthDate}</p>
          }
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={inputValue.gender === "male"}
              onChange={handleOnChange}
            />
            <span>남</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={inputValue.gender === "female"}
              onChange={handleOnChange}
            />
            <span>여</span>
          </label>
        </div>
        <div css={s.dropdownContainer}>
              <button css={s.dropdownButton} onClick={handleToggleCategoryOnClik}>
                  {selectedCategory || '카테고리설정'}
              </button>
              {isCategoryOpen && (
                  <div css={s.dropdownMenu}>
                      {categoryList.map((category) => (
                          <div key={category} css={s.dropdownItem}>
                              <label>
                                  <input
                                      type="radio"
                                      name='category'
                                      value={category.categoryName}
                                      checked={selectedCategory === category.categoryName}
                                      onChange={handleCategoryOnChange}
                                  />
                                  {category.categoryName}
                              </label>
                          </div>
                      ))}
                  </div>
              )}
          </div>
        </div>
      <div css={s.buttonContainer}>
        <button css={s.signupButton} disabled={buttonDisabled} onClick={handleSignupRegOnClick}>회원가입</button>
      </div>
    </div>
  );  
}


export default Signup;