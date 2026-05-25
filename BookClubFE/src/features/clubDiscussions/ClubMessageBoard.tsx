import { useParams } from "react-router-dom";
import CreateThread from "./CreateClubThread";
// import { useGetThreadsQuery } from "./discussionSlice";
import ClubThreads from "./ClubThreads";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useGetClubUserQuery } from "../club/clubSlice";
import CreateThreadUnauthorized from "../discussion/CreateThreadUnauthorized";
import JoinClubModal from "../discussion/JoinClubModal";
// import { useGetThreadsBatchQuery } from "./discussionSlice";

function ClubMessageBoard({ joinClubModalOpen, setJoinClubModalOpen }: {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const { clubid } = useParams()
    const clubId = Number(clubid);

    const { data: userId } = useGetUserIdQuery();
    const { data: clubUser, isError: isGetClubUserError, isSuccess: isGetClubUserSuccess } = useGetClubUserQuery({ clubId: clubId, userId: userId! }, { skip: !userId })



    return (
        <div className="threadsFunctionsContainer">
            {isGetClubUserSuccess && <CreateThread clubUser={clubUser} />}
            {(isGetClubUserError || !userId) && <CreateThreadUnauthorized joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen} />}
            <ClubThreads clubId={clubId} joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen} subThreads={false}/>
            {joinClubModalOpen && <JoinClubModal joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen} />}
        </div>
    );
}

export default ClubMessageBoard;