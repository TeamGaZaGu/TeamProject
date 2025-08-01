/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React from 'react';

function MainLayout({ children }) {
  return (
    <div css={s.root}>
      <div css={s.header}></div>
      <div css={s.body}>
        <div css={s.leftSideBar}></div>
        <div css={s.content}>{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;