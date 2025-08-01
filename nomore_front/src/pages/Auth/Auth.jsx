import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './signup/Signup';

function Auth(props) {
    return (
        <Routes>
            <Route path='/signup' element={ <Signup />} />
        </Routes>
    );
}

export default Auth;