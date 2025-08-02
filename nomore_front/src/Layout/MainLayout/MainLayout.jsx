/** @jsxImportSource @emotion/react */
import { FcGoogle } from 'react-icons/fc';
import * as s from './styles';
import React from 'react';
import { SiKakaotalk } from 'react-icons/si';
import { FaCalendarAlt} from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { BiRun } from 'react-icons/bi';

function MainLayout({ children }) {
  return (
    <div css={s.root}>
      <div css={s.header}>
          <div css={s.logo}>
            <h1>MEEU</h1>
            <h4>meet+you</h4>
          </div>
          <div css={s.searchContainer}>
            <button>지역설정</button>
            <input type="text" placeholder='원하는 모임을 검색해주세요' />
          </div>
      </div>
        <div css={s.leftSideBar}>
          <div css={s.loginContainer}>
            <h2>로그인</h2>
            <button><FcGoogle />구글 로그인</button>
            <button><SiKakaotalk />카카오 로그인</button>
          </div>
          <div css={s.sideMenu}>
            <button><IoHomeSharp />홈</button>
            <button><HiUsers />추천모임</button>
            <button><BsCalendar2EventFill />정모일정</button>
          </div>
          <div css={s.sideCategory}>
            <h3>카테고리</h3>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
            <button>
              <FaRegCircleCheck />
              <BiRun />
              운동/스포츠
            </button>
          </div>
      </div>
        <div css={s.content}>
          {children}
          <div>asdfasdf</div>
        </div>
    </div>
  );
}

export default MainLayout;