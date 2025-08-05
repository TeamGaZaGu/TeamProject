import Home from '../pages/home/Home';
import MainLayout from '../Layout/MainLayout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Mypage from '../pages/Mypage/Mypage';
import Signup from '../pages/Auth/signup/Signup';

function RootRoute(props) {
    
    return (
        <MainLayout>
            <Routes>
                <Route path='/auth/signup' element={ <Signup /> } />
                <Route path='/mypage' element={ <Mypage /> } />
                <Route path='/' element={ <Home />} />
                <Route path='*' element={ <NotFound /> } /> 
            </Routes>
        </MainLayout>
    );
}

export default RootRoute;