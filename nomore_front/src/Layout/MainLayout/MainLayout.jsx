/** @jsxImportSource @emotion/react */
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import LeftSidebarLayout from '../LeftSidebarLayout/LeftSidebarLayout';
import * as s from './styles';

function MainLayout({ children }) {

  return (
    <div>
      <div>
          <HeaderLayout />
      </div>
      <div>
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