import { Link } from "react-router-dom";

function NavMenuMobile({mobileMenuOpen, setMobileMenuOpen}:{mobileMenuOpen: boolean, setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const menuOptionClickHandler = () => {
        setMobileMenuOpen(false);
    }

    return (
        <div className={`nav-menu-mobile ${mobileMenuOpen ? "nav-menu-mobile-open" : "nav-menu-mobile-close"}`}>
            <nav className="nav-menu-mobile-links">
                <Link onClick={menuOptionClickHandler} to="/home">home</Link>
                <Link onClick={menuOptionClickHandler} to="/home">home</Link>
            </nav>
        </div>
    );
}

export default NavMenuMobile;