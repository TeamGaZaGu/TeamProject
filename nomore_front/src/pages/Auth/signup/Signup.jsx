/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React from 'react';

function Signup(props) {

    return (
        <div css={s.layout}>
            <div css={s.mainContainer}>
                <h1>회원가입</h1>
                <div css={s.inputContainer}>
                    <input type="text" placeholder='닉네임' />
                    <input type="text" placeholder='email' />
                    <input type="text" placeholder='이름' />
                    <input type="text" placeholder='생년월일' />
                    <input type="text" placeholder='지역' />
                </div>
                <div>
                    <h3>카테고리</h3>
                </div>
                <div css={s.SignupContainer}>
                    <button>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;