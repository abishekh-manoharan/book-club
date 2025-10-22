import { useGetUserIdQuery } from "../../../features/auth/authSlice";
import { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetJoinedClubsAdminQuery } from "../clubSlice";

interface ClubNavBarPropsInterface {
    privateClub: boolean
}

function ClubNavBar({ privateClub }: ClubNavBarPropsInterface) {
    const { clubid } = useParams();
    const clubId = Number(clubid);
    const { data: userId } = useGetUserIdQuery();
    const { data: adminClubsOfUser } = useGetJoinedClubsAdminQuery(undefined, { skip: !userId });

    const navLinkActiveStyle = {
        color: "white",
        fontWeight: "500"
    };

    const transformedAdminClubsOfUser = useMemo(() => {
        if (adminClubsOfUser && adminClubsOfUser.length > 0) {
            return adminClubsOfUser.map((club) => club.clubId!);
        }
        return null;
    }, [adminClubsOfUser])

    return (
        <div className="clubNavBar">
            <NavLink style={({ isActive }) => isActive ? navLinkActiveStyle : {}} to="readings" className="item">Readings</NavLink>
            <NavLink style={({ isActive }) => isActive ? navLinkActiveStyle : {}} to="members" className="item">Members</NavLink>
            {privateClub && transformedAdminClubsOfUser?.includes(clubId) && <NavLink to="requests" style={({ isActive }) => isActive ? navLinkActiveStyle : {}}>Requests</NavLink>}
        </div>
    );
}

export default ClubNavBar;