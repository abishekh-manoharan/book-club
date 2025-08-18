// this component is responsible for the display of clubs in which the logged in user is part of
import { useMemo, useState } from "react";
import { Club } from "../../utils/types";
import { Link } from "react-router-dom";
import { useGetJoinedClubsAdminQuery, useGetJoinedClubsQuery } from "./clubSlice";

interface OrganizedClubs {
    adminClubs: Club[];
    nonAdminClubs: Club[];
}


function JoinedClubs() {
    const { data: clubs } = useGetJoinedClubsQuery();
    const { data: clubsWhereAdmin } = useGetJoinedClubsAdminQuery();
    const [adminClubsHidden, setAdminClubsHidden] = useState(false);
    const [memberClubsHidden, setMemberClubsHidden] = useState(false);

    const organizedClubs: OrganizedClubs | undefined = useMemo(() => {
        if (clubs && clubsWhereAdmin) {
            const organizedClubs: OrganizedClubs = { adminClubs: [], nonAdminClubs: [] };
            const clubIdsWhereUserIsAdmin = clubsWhereAdmin.map(clubUsers => clubUsers.clubId)

            clubs.forEach(club => {
                if (clubIdsWhereUserIsAdmin.includes(club.clubId)) {
                    organizedClubs.adminClubs.push(club);
                } else {
                    organizedClubs.nonAdminClubs.push(club);
                }
            })

            return organizedClubs;
        }
    }, [clubs, clubsWhereAdmin]);

    const toggleAdminClubsList = () => {
        setAdminClubsHidden((state) => !state);
    }
    const toggleNotJoinedReadingsList = () => {
        setMemberClubsHidden((state) => !state);
    }
    return (
        <div>
            <div className="clubsListHeader" onClick={toggleAdminClubsList}>
                {adminClubsHidden ? <img className="ListHeader-plus" src='src/assets/images/plus.svg' /> :
                    <img className="ListHeader-plus" src='src/assets/images/minus.svg' />}
                <h2>Clubs you manage</h2>
            </div>
            <div className="clubsList clubsListAdmin" hidden={adminClubsHidden}>
                {organizedClubs && organizedClubs.adminClubs.map((club) => <><Link to={`/club/${club.clubId}`} key={club.clubId}>{club.name}</Link><br /></>)}
            </div>

            <div className="clubsListHeader" onClick={toggleNotJoinedReadingsList}>
                {memberClubsHidden ? <img className="ListHeader-plus" src='src/assets/images/plus.svg' /> :
                    <img className="ListHeader-minus" src='src/assets/images/minus.svg' />}
                <h2>Clubs you're a member of</h2>
            </div>
            <div className="clubsList clubsListMember" hidden={memberClubsHidden}>
                {
                    organizedClubs && organizedClubs.nonAdminClubs.map((club) => <><Link to={`/club/${club.clubId}`} key={club.clubId}>{club.name}</Link><br /></>)
                }
            </div>
        </div>
    );
}

export default JoinedClubs;