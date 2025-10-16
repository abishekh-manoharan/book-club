import { NavLink } from "react-router-dom";

function ClubNavBar() {
    const navLinkActiveStyle = {
        color: "white",
        fontWeight: "500"
    };

    return (
        <div className="clubNavBar">                
            <NavLink style={({ isActive }) => isActive ? navLinkActiveStyle : {}}to="readings" className="item">Readings</NavLink>
            <NavLink style={({ isActive }) => isActive ? navLinkActiveStyle : {}}to="members" className="item">Members</NavLink>
            <NavLink to="requests" style={({isActive}) => isActive ? navLinkActiveStyle : {}}>Requests</NavLink>
        </div>
    );
}

export default ClubNavBar;