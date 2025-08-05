import React from 'react';

function Mypage(props) {

    const profileItems = [
        { id: '' }
    ]    

    return (
        <div>
            <h1>마이페이지</h1>
            <div>
                <input type="text" name='nickName'placeholder="닉네임" />
            </div>
            <button>개인정보수정</button>
        </div>
    );  
}

export default Mypage;