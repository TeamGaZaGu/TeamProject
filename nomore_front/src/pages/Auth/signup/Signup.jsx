/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import { reqAuthorizationPublic, reqSignup } from '../../../api/authApi.js';
import * as s from './styles.js';

function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const email = searchParams.get("email");
  const provider = searchParams.get("provider");
  const providerId = searchParams.get("providerId");

  const categories = useCategoryQuery();
  const categoryList = (categories.data?.data || []).filter(
    category => category.categoryName !== '전체'
  );

  const [selectedCategory, setSelectedCategory] = useState();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const SIGNUP_REGEX = {
    nickName: /^[a-zA-Z0-9가-힣]{2,15}$/,
    fullName: /^[가-힣]{2,10}$/,
    birthDate: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
  };

  const SIGNUP_REGEX_ERROR_MESSAGE = {
    nickName: "닉네임은 2~15자 사이의 한글, 영어, 숫자만 가능합니다.",
    fullName: "이름은 2~10자의 한글만 입력해주세요.",
    birthDate: "생년월일은 YYYY-MM-DD 형식으로 정확히 입력해주세요."
  };

  const [helpText, setHelpText] = useState({
    nickName: "",
    fullName: "",
    birthDate: ""
  });

  const [inputValue, setInputValue] = useState({
    nickName: "",
    fullName: "",
    birthDate: "",
    email: email,
    gender: "male",
    categoryId: "",
    provider: provider,
    providerId: providerId
  });

  const [error, setError] = useState({
    nickName: true,
    fullName: true,
    birthDate: true
  });

  useEffect(() => {
    const publicToken = searchParams.get("publicToken");
    if (!publicToken) navigate("/");

    reqAuthorizationPublic(publicToken).then(response => {
      if (!response.data) {
        alert("잘못된 접근입니다.");
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const requiredFields = ['nickName', 'fullName', 'birthDate'];
    const hasEmptyRequiredField = requiredFields.some(
      field => !String(inputValue[field] || "").trim()
    );
    const isCategoryEmpty = !Number.isInteger(inputValue.categoryId);
    const isError = Object.values(error).some(value => value);

    setButtonDisabled(hasEmptyRequiredField || isCategoryEmpty || isError);
  }, [error, inputValue]);

  const formatBirthDate = (value) => {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 4) return onlyNums;
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`;
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}-${onlyNums.slice(6, 8)}`;
  };

  const handleToggleCategoryOnClick = () => {
    setIsCategoryOpen(prev => !prev);
  };

  const handleCategoryOnChange = (e, category) => {
    setSelectedCategory(category.categoryId);
    setIsCategoryOpen(false);
    setInputValue(prev => ({
      ...prev,
      categoryId: category.categoryId
    }));
  };

  const handleSignupRegOnClick = async () => {
    try {
      await reqSignup(inputValue);
      toast.success("회원가입 완료!");
      window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    } catch (error) {
      const errorMessage = error.response.data.body.nickName;
      toast.error(errorMessage);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === 'birthDate') {
      e.target.value = formatBirthDate(e.target.value);
    }

    setInputValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (!SIGNUP_REGEX[e.target.name]) return;

    const isValid = SIGNUP_REGEX[e.target.name].test(e.target.value);

    setError(prev => ({
      ...prev,
      [e.target.name]: !isValid
    }));

    setHelpText(prev => ({
      ...prev,
      [e.target.name]: !isValid ? SIGNUP_REGEX_ERROR_MESSAGE[e.target.name] : ""
    }));
  };

  return (
    <div css={s.layout}>
      <h1>회원가입</h1>

      <div css={s.inputContainer}>
        <div>
          <input
            type="text"
            name="nickName"
            value={inputValue.nickName}
            onChange={handleOnChange}
            placeholder="닉네임"
            css={s.inputStyle}
          />
          {error.nickName && <p>{helpText.nickName}</p>}
        </div>

        <input
          type="email"
          disabled
          value={email}
          css={s.inputStyle}
        />

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="이름"
            value={inputValue.fullName}
            onChange={handleOnChange}
            css={s.inputStyle}
          />
          {error.fullName && <p>{helpText.fullName}</p>}
        </div>

        <div>
          <input
            type="text"
            name="birthDate"
            value={inputValue.birthDate}
            placeholder="생년월일"
            onChange={handleOnChange}
            css={s.inputStyle}
          />
          {error.birthDate && <p>{helpText.birthDate}</p>}
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
          <button css={s.dropdownButton} onClick={handleToggleCategoryOnClick}>
            {selectedCategory
              ? categoryList.find(category => category.categoryId === selectedCategory)?.categoryName
              : '카테고리설정'
            }
          </button>
          
          {isCategoryOpen && (
            <div css={s.dropdownMenu}>
              {categoryList.map((category) => (
                <div key={category.categoryId} css={s.dropdownItem}>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value={category.categoryName}
                      checked={selectedCategory === category.categoryId}
                      onChange={(e) => handleCategoryOnChange(e, category)}
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
        <button
          css={s.signupButton}
          disabled={buttonDisabled}
          onClick={handleSignupRegOnClick}
        >
          회원가입
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;