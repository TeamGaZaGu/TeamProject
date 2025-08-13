import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterForum from '../pages/forum/RegisterForum';

function ForumRoute(props) {
    return (
        <Routes>
            <Route path='/create' element={ <RegisterForum />} />
        </Routes>
    );
}

export default ForumRoute;