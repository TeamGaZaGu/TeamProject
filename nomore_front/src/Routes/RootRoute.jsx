import React from 'react';
import Home from '../pages/home/Home';
import MainLayout from '../Layout/MainLayout/MainLayout';

function RootRoute(props) {
    return (
        <MainLayout>
            <Home />
        </MainLayout>
    );
}

export default RootRoute;