/** @jsxImportSource @emotion/react */
import { FcGoogle } from 'react-icons/fc';
import * as s from './styles';
import React, { useState } from 'react';
import { SiKakaotalk } from 'react-icons/si';
import { IoHomeSharp } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { BiRun } from 'react-icons/bi';
import Oauth2 from '../../Oauth2/Oauth2';
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import LeftSidebarLayout from '../LeftSidebarLayout/LeftSidebarLayout';

function MainLayout({ children }) {

  return (
    <div>
      <div>
          <HeaderLayout />
      </div>
      <div css={s.body}>
        <div>
          <LeftSidebarLayout />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;