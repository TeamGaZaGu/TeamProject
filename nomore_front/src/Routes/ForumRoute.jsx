import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterForum from '../pages/forum/registerForum/RegisterForum';
import DetailedForum from '../pages/forum/detailedForum/DetailedForum';
import ModifyForum from '../pages/forum/modifyForum/ModifyForum';

function ForumRoute(props) {
    return (
        <Routes>
            <Route path='/create' element={ <RegisterForum />} />
            <Route path='/detail' element={ <DetailedForum />} />
            <Route path='/modify' element={ <ModifyForum />} />
        </Routes>
    );
}

export default ForumRoute;