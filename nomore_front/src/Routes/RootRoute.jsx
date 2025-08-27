import Home from '../pages/home/Home';
import MainLayout from '../Layout/MainLayout/MainLayout';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Mypage from '../pages/Mypage/Mypage';
import Signup from '../pages/Auth/signup/Signup';
import Oauth2Redirect from '../Oauth2/Oauth2Redirect';
import Loading from '../Loading/Loading';
import usePrincipalQuery from '../queries/usePrincipalQuery';
import SearchPage from '../pages/search/SearchPage';
import SuggestRoute from './SuggestRoute';
import CatogoryPage from '../pages/CategoryPage/CatogoryPage';
import UserManagement from '../pages/UserManagement/UserManagement';
import ForumRoute from './ForumRoute';
import BenUserPage from '../pages/BenUserPage/BenUserPage';
import ChattingPage from '../pages/chatting/ChattingPage';

function RootRoute(props) {
    const principalQuery = usePrincipalQuery();
    const user = principalQuery?.data?.data?.user;

    if (!principalQuery.isFetched) {
        return <Loading />
    }

    if (user?.userSiteBlock === 1) {
        return (
            <MainLayout>
                <BenUserPage />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Routes>
                <Route path='/suggest/*' element={ <SuggestRoute /> } />
                <Route path='/forum/*' element={ <ForumRoute /> } />
                <Route path='/searchpage' element={ <SearchPage /> } />
                <Route path='/oauth2/login' element={<Oauth2Redirect />} />
                <Route path='/auth/signup' element={ <Signup /> } />
                <Route path='/chatting/:moimId' element={ <ChattingPage /> } />
                <Route path='/mypage' element={ <Mypage /> } />
                <Route path='/category/*' element={ <CatogoryPage /> } />
                {user?.userRole === "ROLE_ADMIN" && (
                    <Route path='/userManagement' element={<UserManagement />} />
                )}
                <Route path='/' element={ <Home />} />
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        </MainLayout>
    );
}

export default RootRoute;