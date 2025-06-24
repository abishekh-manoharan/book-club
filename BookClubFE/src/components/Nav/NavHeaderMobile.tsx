import NotificationHeader from "../../features/notification/NotificationHeader";

function NavHeaderMobile({setMobileMenuOpen}: { setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const menuButtonClickHandler = () => {
        console.log("click")
        // root!.style.setProperty = mobileMenuOpen ? "auto" : "hidden";
        const root = document.getElementById("root");
        // root!.setAttribute('style', 'overflow-y: hidden;')

        setMobileMenuOpen(state => {
            root?.style.setProperty('overflow-y', state ? "auto" : "hidden");
            return !state;
        });
    }

    return (
        <div className="nav-header-mobile">
            <NotificationHeader/>
            <div className="nav-header-mobile-menu-button" onClick={menuButtonClickHandler}>menu</div>
        </div>
    );
}

export default NavHeaderMobile;