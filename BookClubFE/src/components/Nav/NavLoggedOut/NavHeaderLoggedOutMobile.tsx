import { Link } from "react-router-dom";

function NavHeaderLoggedOutMobile({setMobileMenuOpen}: { setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const menuButtonClickHandler = () => {
        const root = document.getElementById("root");

        setMobileMenuOpen(state => {
            root?.style.setProperty('overflow-y', state ? "auto" : "hidden");
            return !state;
        });
    }

    return (
        <div className="nav-header-mobile">
            <div className="nav-header-mobile-menu-button" onClick={menuButtonClickHandler}>menu</div>
            <Link to="/login" className="signIn">
                Sign In
            </Link>
        </div>
    );
}

export default NavHeaderLoggedOutMobile;