import React, { useState } from 'react';
import NavHeaderMobile from './Nav/NavHeaderMobile';
import NavMenuMobile from './Nav/NavMenuMobile';

function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className='layout-mobile'>
            <NavHeaderMobile setMobileMenuOpen={setMobileMenuOpen}/>
            <NavMenuMobile mobileMenuOpen={mobileMenuOpen}/>
        </div>
    );
}

export default Layout;