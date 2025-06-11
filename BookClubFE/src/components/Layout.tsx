import React, { useState } from 'react';
import NavHeaderMobile from './Nav/NavHeaderMobile';
import NavMenuMobile from './Nav/NavMenuMobile';
import { Outlet } from 'react-router-dom';

function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className='layout-mobile'>
            <NavHeaderMobile setMobileMenuOpen={setMobileMenuOpen}/>
            <NavMenuMobile mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>
            <Outlet/>
        </div>
    );
}

export default Layout;