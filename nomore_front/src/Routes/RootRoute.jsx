import Home from '../pages/home/Home';
import MainLayout from '../Layout/MainLayout/MainLayout';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Mypage from '../pages/Mypage/Mypage';
import Signup from '../pages/Auth/signup/Signup';
import Oauth2Redirect from '../Oauth2/Oauth2Redirect';
import Loading from '../Loading/Loading';
import usePrincipalQuery from '../queries/usePrincipalQuery';
import SearchPage from '../pages/search/SearchPage';
import MoimRoute from './MoimRoute';
import CatogoryPage from '../pages/CategoryPage/CatogoryPage';
import UserManagement from '../pages/UserManagement/UserManagement';
import ForumRoute from './ForumRoute';
import BenUserPage from '../pages/BenUserPage/BenUserPage';
import ChattingPage from '../pages/chatting/ChattingPage';
import ReportManagement from '../pages/ReportManagement/ReportManagement';
import UserDetailPage from '../pages/UserDetail/UserDetailPage';
import RecentViewedPage from '../pages/RecentViewedPage/RecentViewedPage';

function RootRoute(props) {
    const principalQuery = usePrincipalQuery();
    const user = principalQuery?.data?.data?.user;

    // 로딩 중일 때
    if (!principalQuery.isFetched) {
        return <Loading />
    }

    // 디버깅을 위한 콘솔 로그
    console.log('User data:', user);
    console.log('userSiteBlock:', user?.userSiteBlock);
    console.log('userSiteBlock type:', typeof user?.userSiteBlock);

    // 사용자가 차단된 경우 (1 또는 "1" 모두 처리)
    if (user && (user.userSiteBlock === 1 || user.userSiteBlock === "1")) {
        return (
            <MainLayout>
                <Routes>
                    <Route path='/temporaryBlocking' element={<BenUserPage />} />
                    {/* 다른 모든 경로를 차단 페이지로 리다이렉트 */}
                    <Route path='*' element={<Navigate to="/temporaryBlocking" replace />} />
                </Routes>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Routes>
                <Route path='/moim/*' element={<MoimRoute />} />
                <Route path='/forum/*' element={<ForumRoute />} />
                <Route path='/searchpage' element={<SearchPage />} />
                <Route path='/oauth2/login' element={<Oauth2Redirect />} />
                <Route path='/auth/signup' element={<Signup />} />
                <Route path='/chatting/:moimId' element={<ChattingPage />} />
                <Route path='/mypage' element={<Mypage />} />
                <Route path='/category/*' element={<CatogoryPage />} />
                <Route path='/recent-viewed' element={<RecentViewedPage />} />
                {user?.userRole === "ROLE_ADMIN" && (
                    <>
                        <Route path='/userManagement' element={<UserManagement />} />
                        <Route path='/reportManagement' element={<ReportManagement />} />
                        <Route path="/admin/user/:userId" element={<UserDetailPage />} />
                    </>
                )}
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </MainLayout>
    );
}

export default RootRoute;