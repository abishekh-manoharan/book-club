// component primarily used to decide if the landing page or the layout page should be displayed

import React from 'react';
import LandingPage from './LandingPage';
import Layout from './Layout';
import Login from './../features/auth/Login';

function Main({status}: {status: boolean}) {
    if(!status){
        return <Login />;
    }
    return (
        <Layout/>
    );
}

export default Main;