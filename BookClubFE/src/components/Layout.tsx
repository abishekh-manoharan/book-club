import React, { useState } from 'react';
import NavHeaderLoggedInMobile from './Nav/NavLoggedIn/NavHeaderLoggedInMobile';
import NavMenuLoggedInMobile from './Nav/NavLoggedIn/NavMenuLoggedInMobile';
import NavHeaderLoggedOutMobile from './Nav/NavLoggedOut/NavHeaderLoggedOutMobile';
import NavMenuLoggedOutMobile from './Nav/NavLoggedOut/NavMenuLoggedOutMobile';
import { Outlet } from 'react-router-dom';

function Layout({ status }: { status: boolean }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className='layout-mobile'>
            {status ?
                <>
                    <NavHeaderLoggedInMobile setMobileMenuOpen={setMobileMenuOpen} />
                    <NavMenuLoggedInMobile mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                </>
                : <>
                    <NavHeaderLoggedOutMobile setMobileMenuOpen={setMobileMenuOpen} />
                    <NavMenuLoggedOutMobile mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                </>
            }
            <Outlet />
        </div>
    );
}

export default Layout;