import React from 'react';
import Home from '../pages/home/Home';
import MainLayout from '../Layout/MainLayout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';
import NotFound from '../pages/NotFound/NotFound';

function RootRoute(props) {
    return (
        <MainLayout>
            <Routes>
                <Route path='Auth/*' element={ <Auth /> } />
                <Route path='/' element={ <Home />} />
                <Route path='*' element= { <NotFound /> } />
            </Routes>
        </MainLayout>
    );
}

export default RootRoute;