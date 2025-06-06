function NavHeaderMobile({setMobileMenuOpen}: { setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const menuButtonClickHandler = () => {
        console.log("click")
        setMobileMenuOpen(state => !state);
    }

    return (
        <div className="nav-header-mobile">
            <div className="nav-header-mobile-notification">notif</div>
            <div className="nav-header-mobile-menu-button" onClick={menuButtonClickHandler}>menu</div>
        </div>
    );
}

export default NavHeaderMobile;