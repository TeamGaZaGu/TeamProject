import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateSuggestpage from '../pages/suggestMoim/createSuggestMoim/CreateSuggestpage';
import SearchSuggestPage from '../pages/suggestMoim/searchSuggestMoim/SearchSuggestPage';
import NotFound from '../pages/NotFound/NotFound';

function SuggestRoute(props) {

    return (
        <Routes>       
            <Route path='/search' element={ <SearchSuggestPage /> } />
            <Route path='/create' element={ <CreateSuggestpage /> } />
            <Route path='/*' element={ <NotFound /> } /> 
        </Routes>
    );
}

export default SuggestRoute;