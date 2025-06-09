import NotificationHeader from "../../features/notification/NotificationHeader";

function NavHeaderMobile({setMobileMenuOpen}: { setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const menuButtonClickHandler = () => {
        console.log("click")
        setMobileMenuOpen(state => !state);
    }

    return (
        <div className="nav-header-mobile">
            <NotificationHeader/>
            <div className="nav-header-mobile-menu-button" onClick={menuButtonClickHandler}>menu</div>
        </div>
    );
}

export default NavHeaderMobile;