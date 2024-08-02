import { NavLink, Outlet } from "react-router-dom";
import { GetAuthContext } from "../utils/context";

function Header() {
    const auth = GetAuthContext();

    return (
        <div>
            <NavLink to="/">Home</NavLink> <br />
            {!auth.auth ? <>
                <NavLink to="register">Register</NavLink> <br />
                <NavLink to="login">Login</NavLink>
            </> : <></>}
            <Outlet />
        </div>
    );
}

export default Header;