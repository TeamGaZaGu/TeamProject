/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React from 'react';
import Oauth2 from '../../Oauth2/Oauth2';
import { IoHomeSharp } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { BiRun } from 'react-icons/bi';

function LeftSidebarLayout(props) {
    const categories = [
        "운동/스포츠",
        "독서",
        "게임/오락",
        "운동/스포츠",
        "독서",
        "게임/오락",
        "운동/스포츠",
        
       
    ];
    
    return (
        <div css={s.leftSideBar}>
            <div>
                <Oauth2 />
            </div>
            <div css={s.sideMenu}>
                <button><IoHomeSharp />홈</button>
                <button><HiUsers />추천모임</button>
                <button><BsCalendar2EventFill />정모일정</button>
            </div>
            <div css={s.category}>
                <h3>카테고리</h3>
                {categories.map((category, index) => (
                <div>
                    <label key={index}>
                    <input
                        type="radio"
                        name="category"
                        value={category}
                    />
                    <BiRun />
                    {category}
                    </label>
                </div>
                ))}
            </div>
        </div>
    );
}

export default LeftSidebarLayout;