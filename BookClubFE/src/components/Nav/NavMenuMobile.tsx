import { useGetUserIdQuery, useGetUserQuery } from "../../features/auth/authSlice";
import SearchClubBar from "../../features/club/SearchClubBar";
import { Link } from "react-router-dom";


function NavMenuMobile({mobileMenuOpen, setMobileMenuOpen}:{mobileMenuOpen: boolean, setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) { 
    const {data: userId} = useGetUserIdQuery();
    const {data: user} = useGetUserQuery(Number(userId), {skip: !userId});
    
    const menuOptionClickHandler = () => {
        const root = document.getElementById("root");
        root?.style.setProperty('overflow-y', mobileMenuOpen ? "auto" : "hidden");

        setMobileMenuOpen(!mobileMenuOpen);
        // root!.setAttribute('style', 'overflow-y: hidden;')
    }
    
    return (
        <div className={`nav-menu-mobile ${mobileMenuOpen ? "nav-menu-mobile-open" : "nav-menu-mobile-close"}`}>
            <nav className="nav-menu-mobile-links">
                <SearchClubBar/>
                <Link onClick={menuOptionClickHandler} to="/home">home</Link>
                <Link onClick={menuOptionClickHandler} to="/clubs">clubs</Link>
                <Link onClick={menuOptionClickHandler} to="/activeReadings">active readings</Link>
                {user && <>{user.fName} {user.lName}</>}
            </nav>
        </div>
    );
}

export default NavMenuMobile;