import { useParams } from "react-router-dom";
import CreateThread from "./CreateThread";
// import { useGetThreadsQuery } from "./discussionSlice";
import ClubThreads from "./ClubThreads";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useGetClubUserQuery } from "../club/clubSlice";
import CreateThreadUnauthorized from "../discussion/CreateThreadUnauthorized";
import { useState } from "react";
import JoinClubModal from "../discussion/JoinClubModal";
// import { useGetThreadsBatchQuery } from "./discussionSlice";

function ClubMessageBoard() {
    const { clubid } = useParams()
    const clubId = Number(clubid);

    const { data: userId } = useGetUserIdQuery();
    const { isError: isGetClubUserError, isSuccess: isGetClubUserSuccess } = useGetClubUserQuery({ clubId: clubId, userId: userId! }, { skip: !userId })
    
    const [joinClubModalOpen, setJoinClubModalOpen] = useState(false);

    return (
        <div className="threadsFunctionsContainer">
            {isGetClubUserSuccess && <CreateThread />} 
            {isGetClubUserError || !userId && <CreateThreadUnauthorized joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen}/>}
            <ClubThreads clubId={clubId} joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen}/>
            {joinClubModalOpen && <JoinClubModal joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen}/>}   
        </div>
    );
}

export default ClubMessageBoard;