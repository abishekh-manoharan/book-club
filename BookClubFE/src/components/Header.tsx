import { NavLink, Outlet } from "react-router-dom";
import { GetAuthContext } from "../utils/context";
import AuthService from "../services/auth";

function Header() {
    const auth = GetAuthContext();

    const logoutClickHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        AuthService.logout();
        auth.setAuth(false);
    }

    return (
        <>

            <nav className="header">
                <NavLink to="/">Home</NavLink> <br />
                {!auth.auth ? <>
                    <NavLink to="register">Register</NavLink> <br />
                    <NavLink to="login">Login</NavLink>
                </> : <></>}
                {auth.auth ? <>
                    <NavLink to="createClub">Create Club</NavLink><br></br>
                    <NavLink to="joinedClubs">Joined Clubs</NavLink><br></br>
                    <a onClick={logoutClickHandler} href="">Logout</a>
                </> : <></>}
            </nav>
            <Outlet />
        </>
    );
}

export default Header;