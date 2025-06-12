// this component is responsible for the display of clubs in which the logged in user is part of
import { useEffect, useState } from "react";
import { Club } from "../../utils/types";
import { Link } from "react-router-dom";
import { useGetJoinedClubsQuery } from "./clubSlice";

function JoinedClubs() {
    const [joinedClubs, setJoinedClubs] = useState<Club[]>([]);
    const { data: clubs } = useGetJoinedClubsQuery();

    useEffect(() => {
        if(clubs){
            setJoinedClubs(clubs);
        }
    }, [clubs])

    return (
        <div>
            {
                joinedClubs && joinedClubs.map((club) => <><Link to={`/club/${club.clubId}`}  key={club.clubId}>{club.name}</Link><br/></>)
            }
        </div>
    );
}

export default JoinedClubs;