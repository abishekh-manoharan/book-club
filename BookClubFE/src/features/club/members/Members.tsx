import { NavLink, Outlet } from "react-router-dom";

function Members() {
    
    const navLinkActiveStyle = { 
        color: "#B47B84",
        borderLeft: "solid",
        paddingLeft: "5px"
    };

    return (
        <div>
            <nav className="membersNavBar" >
                <NavLink to="members" style={({isActive}) => isActive ? navLinkActiveStyle : {}}>Members</NavLink>
                <NavLink to="requests" style={({isActive}) => isActive ? navLinkActiveStyle : {}}>Requests</NavLink>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Members;