import { NavLink } from "react-router-dom";

function NavBar() {
    const navLinkActiveStyle = {
        color: "white",
        fontWeight: "500"
    };

    return (
        <div className="clubNavBar">
            <NavLink style={({ isActive }) => isActive ? navLinkActiveStyle : {}} to="meetings" className="item">Meetings</NavLink>
            <NavLink style={({ isActive }) => isActive ? navLinkActiveStyle : {}} to="readers" className="item">Readers</NavLink>
            <NavLink style={({ isActive }) => isActive ? navLinkActiveStyle : {}} to="discussions" className="item">Discussions</NavLink>
        </div>
    );
}

export default NavBar;