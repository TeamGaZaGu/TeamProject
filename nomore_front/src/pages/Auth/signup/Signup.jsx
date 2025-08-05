/** @jsxImportSource @emotion/react */
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api/axios.js';

function parseJwt(token) {
  if (!token) return {};
  const pure = token.replace(/^Bearer /, "");
  try {
    return JSON.parse(atob(pure.split('.')[1]));
  } catch {
    return {};
  }
}

function Signup() {
  const categories = useCategoryQuery();
  const categoryList = (categories.data?.data || []).filter(category => category.categoryName !== '전체');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState({
    nickName: "",
    fullName: "",
    birthDate: "",
    email: "",
    gender: "male",
    category: "", 
  });

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
    }
  }, [searchParams]);

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.email) {
        setInputValue(prev => ({
          ...prev,
          email: payload.email,
        }));
      }
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const SIGNUP_REGEX = {
    nickName: /^[a-zA-Z0-9가-힣]{2,15}$/,
    fullName: /^[가-힣]{2,10}$/,
    birthDate: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    notEmpty: /^.+$/,
  };
  const SIGNUP_REGEX_ERROR_MESSAGE = {
    nickName: "닉네임은 2~15자 사이의 한글, 영어, 숫자만 가능합니다.",
    fullName: "이름은 2~10자의 한글만 입력해주세요.",
    birthDate: "생년월일은 YYYY-MM-DD 형식으로 정확히 입력해주세요."
  };
  const [helpText, setHelpText] = useState({
    nickName: "",
    fullName: "",
    birthDate: "",
  });
  const [error, setError] = useState({
    nickName: false,
    fullName: false,
    birthDate: false,
  });

  useEffect(() => {   // category 미선택시 회원가입 버튼 안눌리게
    const isEmptyValue = !!Object.values(inputValue).filter(value => !value.trim()).length;
    const isError = !!Object.values(error).filter(value => !!value).length;
    setButtonDisabled(isEmptyValue || isError);

    Object.entries(error).forEach(([key, value]) => {
      setHelpText(prev => ({
        ...prev,
        [key]: !value ? "" : SIGNUP_REGEX_ERROR_MESSAGE[key],
      }));
    });
  }, [inputValue, error]);

  const handleToggleCategoryOnClick = () => {
    setIsCategoryOpen(prev => !prev);
  };

  const handleCategoryOnChange = (e) => {
    setSelectedCategory(e.target.value);
    setInputValue(prev => ({
      ...prev,
      category: e.target.value,
    }));
    setIsCategoryOpen(false);
  };

  const handleOnChange = (e) => {
    if (e.target.name === "email") return;

    setInputValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

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
    }));
  };

  const handleSignupRegOnClick = async () => {
    try {
      await api.post(
        "/auth/signup",
        {
          nickName: inputValue.nickName,
          fullName: inputValue.fullName,
          birthDate: inputValue.birthDate,
          gender: inputValue.gender,
          category: inputValue.category,
        },
        {
          headers: {
            Authorization: localStorage.getItem("AccessToken"),
          }
        }
      );
      navigate("/");
    } catch (error) {
      alert("회원가입 실패!");
    }
  };

  return (
    <div css={s.layout}>
      <h1>회원가입</h1>
      <div css={s.inputContainer}>
        <div>
          <input type="text" name='nickName' value={inputValue.nickName} onChange={handleOnChange} placeholder="닉네임" css={s.inputStyle} />
          {error.nickName && <p>{helpText.nickName}</p>}
        </div>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={inputValue.email}
          disabled
          css={s.inputStyle}
        />
        <div>
          <input type="text" name='fullName' value={inputValue.fullName} placeholder="이름" onChange={handleOnChange} css={s.inputStyle} />
          {error.fullName && <p>{helpText.fullName}</p>}
        </div>
        <div>
          <input type="text" name='birthDate' value={inputValue.birthDate} placeholder="생년월일" onChange={handleOnChange} css={s.inputStyle} />
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
              ? categoryList.find(c => String(c.categoryId) === selectedCategory)?.categoryName
              : '카테고리설정'}
          </button>
          {isCategoryOpen && (
            <div css={s.dropdownMenu}>
              {categoryList.map((category) => (
                <div key={category.categoryId} css={s.dropdownItem}>
                  <label>
                    <input
                      type="radio"
                      name='category'
                      value={category.categoryId}
                      checked={selectedCategory === String(category.categoryId)}
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
