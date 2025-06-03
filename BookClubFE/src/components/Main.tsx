import React from 'react';
import LandingPage from './LandingPage';
import Layout from './Layout';

function Main({status}: {status: boolean}) {
    if(!status){
        return <LandingPage />;
    }
    return (
        <Layout/>
    );
}

export default Main;