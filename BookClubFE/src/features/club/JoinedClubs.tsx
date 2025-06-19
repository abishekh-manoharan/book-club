// this component is responsible for the display of clubs in which the logged in user is part of
import { useMemo } from "react";
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

    const organizedClubs: OrganizedClubs | undefined = useMemo(() => {
        if (clubs && clubsWhereAdmin) {
            const organizedClubs: OrganizedClubs = {adminClubs: [], nonAdminClubs: []};
            const clubIdsWhereUserIsAdmin = clubsWhereAdmin.map(clubUsers => clubUsers.clubId)
            
            clubs.forEach(club => {
                if(clubIdsWhereUserIsAdmin.includes(club.clubId)){
                    organizedClubs.adminClubs.push(club);
                } else {
                    organizedClubs.nonAdminClubs.push(club);
                }
            })

            return organizedClubs;
        }
    }, [clubs, clubsWhereAdmin]);
    
    return (
        <div>
            <h2>admin clubs</h2>
            {
                organizedClubs && organizedClubs.adminClubs.map((club) => <><Link to={`/club/${club.clubId}`} key={club.clubId}>{club.name}</Link><br /></>)
            }
            <h2>non-admin clubs</h2>
            {
                organizedClubs && organizedClubs.nonAdminClubs.map((club) => <><Link to={`/club/${club.clubId}`} key={club.clubId}>{club.name}</Link><br /></>)
            }
        </div>
    );
}

export default JoinedClubs;