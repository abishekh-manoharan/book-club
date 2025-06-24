import SearchClubBar from "../../features/club/SearchClubBar";
import { Link } from "react-router-dom";


function NavMenuMobile({mobileMenuOpen, setMobileMenuOpen}:{mobileMenuOpen: boolean, setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const menuOptionClickHandler = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <div className={`nav-menu-mobile ${mobileMenuOpen ? "nav-menu-mobile-open" : "nav-menu-mobile-close"}`}>
            <nav className="nav-menu-mobile-links">
                <SearchClubBar/>
                <Link onClick={menuOptionClickHandler} to="/home">home</Link>
                <Link onClick={menuOptionClickHandler} to="/clubs">clubs</Link>
                <Link onClick={menuOptionClickHandler} to="/activeReadings">active readings</Link>
            </nav>
        </div>
    );
}

export default NavMenuMobile;