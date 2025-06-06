function NavMenuMobile({mobileMenuOpen}:{mobileMenuOpen: boolean}) {
    return (
        <div className={`nav-menu-mobile ${mobileMenuOpen ? "nav-menu-mobile-open" : "nav-menu-mobile-close"}`}>
            menu mobile
        </div>
    );
}

export default NavMenuMobile;