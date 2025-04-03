import { NavLink, Outlet } from "react-router-dom";
// import { GetAuthContext } from "../utils/context";
// import AuthService from "../services/auth";
import SearchBar from "../features/club/SearchClubBar";
import {  useGetStatusQuery, useLogoutMutation } from "../features/auth/authSlice";
// import { useAppSelector } from "../app/hooks";

function Header() {
    // const auth = GetAuthContext();
    const { data: loginStatus } = useGetStatusQuery();
    const [logout] = useLogoutMutation();

    const logoutClickHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        logout();
    }

    return (
        <>

            <nav className="header">
                <NavLink to="/">Home</NavLink> <br />
                {!loginStatus ? <>
                    <NavLink to="register">Register</NavLink> <br />
                    <NavLink to="login">Login</NavLink>
                </> : <></>}
                {loginStatus ? <>
                    <NavLink to="createClub">Create Club</NavLink><br></br>
                    <NavLink to="joinedClubs">Joined Clubs</NavLink><br></br>
                    <a onClick={logoutClickHandler} href="">Logout</a>
                </> : <></>}
                <SearchBar/>
            </nav>
            <Outlet />
        </>
    );
}

export default Header;