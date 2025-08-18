import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterForum from '../pages/forum/registerForum/RegisterForum';
import DetailedForum from '../pages/forum/detailedForum/DetailedForum';

function ForumRoute(props) {
    return (
        <Routes>
            <Route path='/create' element={ <RegisterForum />} />
            <Route path='/detail/:moimId/:forumId' element={ <DetailedForum />} />
        </Routes>
    );
}

export default ForumRoute;