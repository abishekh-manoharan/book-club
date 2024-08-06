import { NavLink, Outlet } from "react-router-dom";
import { GetAuthContext } from "../utils/context";

function Header() {
    const auth = GetAuthContext();

    return (
        <nav>
            <NavLink to="/">Home</NavLink> <br />
            {!auth.auth ? <>
                <NavLink to="register">Register</NavLink> <br />
                <NavLink to="login">Login</NavLink>
            </> : <></>}
            <Outlet />
        </nav>
    );
}

export default Header;