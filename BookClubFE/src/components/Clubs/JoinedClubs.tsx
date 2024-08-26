// this component is responsible for the display of clubs in which the logged in user is part of
import { useEffect, useState } from "react";
import ClubService from "../../services/club";
import { Club } from "../../utils/types";

function JoinedClubs() {
    const [joinedClubs, setJoinedClubs] = useState<Club[]>([]);

    useEffect(() => {
        ClubService.getJoinedClubs().then(res => setJoinedClubs(res))
    }, [])

    return (
        <div>
            {joinedClubs.map((club) => <p  key={club.clubId}>{club.name}</p>)}
        </div>
    );
}

export default JoinedClubs;