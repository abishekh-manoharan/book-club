import { Link } from "react-router-dom";

function NavMenuMobile({mobileMenuOpen}:{mobileMenuOpen: boolean}) {
    return (
        <div className={`nav-menu-mobile ${mobileMenuOpen ? "nav-menu-mobile-open" : "nav-menu-mobile-close"}`}>
            <nav className="nav-menu-mobile-links">
                <Link onClick={() => console.log("clicked link")} to="/home">home</Link>
                <Link to="/home">home</Link>
            </nav>
        </div>
    );
}

export default NavMenuMobile;