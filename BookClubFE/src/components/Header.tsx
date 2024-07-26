import { NavLink, Outlet } from "react-router-dom";

function Header() {
    return (
        <div>
            Register
            <NavLink to="register">Register</NavLink>
            <Outlet/>
        </div>
    );
}

export default Header;