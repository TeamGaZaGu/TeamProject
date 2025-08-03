/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React from 'react';

function Signup(props) {
  return (
    <div css={s.layout}>
      <h1>회원가입</h1>
      <div css={s.inputContainer}>
        <input type="text" placeholder="닉네임" css={s.inputStyle} />
        <input type="email" placeholder="email" css={s.inputStyle} />
        <input type="text" placeholder="이름" css={s.inputStyle} />
        <input type="date" placeholder="생년월일" css={s.inputStyle} />
        <input type="text" placeholder="지역" css={s.inputStyle} />
      </div>
      <div css={s.categoryContainer}>
        <h3 css={s.categoryTitle}>카테고리</h3>
      </div>
      <div css={s.buttonContainer}>
        <button css={s.signupButton}>회원가입</button>
      </div>
    </div>
  );
}

export default Signup;