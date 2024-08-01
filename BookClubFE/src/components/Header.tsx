import { NavLink, Outlet } from "react-router-dom";

function Header() {
    return (
        <div>
            <NavLink to="/">Home</NavLink> <br/>
            <NavLink to="register">Register</NavLink> <br/>
            <NavLink to="login">Login</NavLink>
            <Outlet/>
        </div>
    );
}

export default Header;