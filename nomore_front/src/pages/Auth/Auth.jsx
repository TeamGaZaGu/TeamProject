import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './signup/Signup';
import NotFound from '../NotFound/NotFound';

function Auth(props) {
    return (
        <Routes>
            <Route path='/signup' element={ <Signup />} />
            <Route path='/*' element={ <NotFound />} />
        </Routes>
    );
}

export default Auth;