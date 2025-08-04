/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';

function Signup(props) {

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

  const handleGenderChange = (e) => {
    setInputValue(prev => ({
      ...prev,
      gender: e.target.value // "male" 또는 "female"
    }));
  };


  const handleSignupRegOnClick = () => {

  }
    const handleOnChange = (e) => {
      setInputValue(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
  
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
              onChange={handleGenderChange}
            />
            <span>남</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={inputValue.gender === "female"}
              onChange={handleGenderChange}
            />
            <span>여</span>
          </label>
        </div>
      </div>
      <div css={s.buttonContainer}>
        <button css={s.signupButton} disabled={buttonDisabled} onClick={handleSignupRegOnClick}>회원가입</button>
      </div>
    </div>
  );  
}


export default Signup;