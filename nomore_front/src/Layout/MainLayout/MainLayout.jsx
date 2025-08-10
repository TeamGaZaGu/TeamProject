/** @jsxImportSource @emotion/react */
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import LeftSidebarLayout from '../LeftSidebarLayout/LeftSidebarLayout';
import * as s from './styles';

function MainLayout({ children }) {
  return (
    <div css={s.containerStyle}>
      <div css={s.headerStyle}>
        <HeaderLayout />
      </div>
      <div css={s.body}>
        <div css={s.sidebarStyle}>
          <LeftSidebarLayout />
        </div>
        <div css={s.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;