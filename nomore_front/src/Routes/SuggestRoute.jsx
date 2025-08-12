import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateSuggestpage from '../pages/suggestMoim/createSuggestMoim/CreateSuggestpage';
import NotFound from '../pages/NotFound/NotFound';
import CheckSuggestMoim from '../pages/suggestMoim/checkSuggestMoim/CheckSuggestMoim';
import DescriptionSuggestPage from '../pages/suggestMoim/descriptionSuggestPage/descriptionSuggestPage';
import ModifySuggestMoim from '../pages/suggestMoim/modifySuggestMoim/ModifySuggestMoim';

function SuggestRoute(props) {

    return (
        <Routes>       
            <Route path='/find' element={ <CheckSuggestMoim /> } />
            <Route path='/create' element={ <CreateSuggestpage /> } />
            <Route path='/description' element={ <DescriptionSuggestPage /> } />
            <Route path='/modify' element={ <ModifySuggestMoim /> } />
            <Route path='/*' element={ <NotFound /> } />
        </Routes>
    );
}

export default SuggestRoute;