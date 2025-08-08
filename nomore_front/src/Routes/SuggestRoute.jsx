import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateSuggestpage from '../pages/suggestMoim/createSuggestMoim/CreateSuggestpage';
import NotFound from '../pages/NotFound/NotFound';
import FindSuggestPage from '../pages/suggestMoim/searchSuggestMoim/FindSuggestPage';
import DescriptionSuggestPage from '../pages/suggestMoim/descriptionSuggestPage/descriptionSuggestPage';

function SuggestRoute(props) {

    return (
        <Routes>       
            <Route path='/find' element={ <FindSuggestPage /> } />
            <Route path='/create' element={ <CreateSuggestpage /> } />
            <Route path='/description' element={ <DescriptionSuggestPage /> } />
            <Route path='/*' element={ <NotFound /> } /> 
        </Routes>
    );
}

export default SuggestRoute;