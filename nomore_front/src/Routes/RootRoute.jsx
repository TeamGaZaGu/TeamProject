import Home from '../pages/home/Home';
import MainLayout from '../Layout/MainLayout/MainLayout';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Mypage from '../pages/Mypage/Mypage';
import Signup from '../pages/Auth/signup/Signup';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Oauth2Redirect from '../Oauth2/Oauth2Redirect';

function RootRoute(props) {
   

    return (
        <MainLayout>
            <Routes>
                <Route path='/auth/signup' element={ <Signup /> } />
                <Route path='/mypage' element={ <Mypage /> } />
                <Route path='/' element={ <Home />} />
                <Route path='*' element={<NotFound />} /> 
                <Route path="/oauth2/redirect" element={<Oauth2Redirect />} />
            </Routes>
        </MainLayout>
    );
}

export default RootRoute;