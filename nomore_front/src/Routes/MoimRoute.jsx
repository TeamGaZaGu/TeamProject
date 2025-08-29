import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateMoim from '../pages/moim/createMoim/CreateMoim';
import NotFound from '../pages/NotFound/NotFound';
import FindMoim from '../pages/moim/findMoim/FindMoim';
import DetailMoim from '../pages/moim/detailMoim/DetailMoim';
import ModifyMoim from '../pages/moim/modifyMoim/ModifyMoim';

function MoimRoute(props) {

    return (
        <Routes>       
            <Route path='/find' element={ <FindMoim /> } />
            <Route path='/create' element={ <CreateMoim /> } />
            <Route path='/detail' element={ <DetailMoim /> } />
            <Route path='/modify' element={ <ModifyMoim /> } />
            <Route path='/*' element={ <NotFound /> } />
        </Routes>
    );
}

export default MoimRoute;