import { useParams } from "react-router-dom";
import CreateThread from "./CreateThread";
// import { useGetThreadsQuery } from "./discussionSlice";
import Threads from "./Threads";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useGetClubUserQuery } from "../club/clubSlice";
import CreateThreadUnauthorized from "./CreateThreadUnauthorized";
import { useState } from "react";
import JoinClubModal from "./JoinClubModal";
// import { useGetThreadsBatchQuery } from "./discussionSlice";

function DiscussionBoard() {
    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: userId } = useGetUserIdQuery();
    const { data: clubUser } = useGetClubUserQuery({ clubId: clubId, userId: userId! }, { skip: !userId })
    
    const [joinClubModalOpen, setJoinClubModalOpen] = useState(false);
    // console.log(clubId)
    // console.log(bookId)
    // const {isError, error, isLoading} = useGetThreadsBatchQuery({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() });
    // if(isError){
    //     console.log(error)
    //     return "error";
    // } else if (isLoading){
    //     return "loading";
    // }
    // else {
    //     console.log("not error")
    // }

    return (
        <div className="threadsFunctionsContainer">
            {clubUser ? <CreateThread /> : <CreateThreadUnauthorized joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen}/>}
            <Threads clubId={clubId} bookId={bookId} joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen}/>
            <JoinClubModal joinClubModalOpen={joinClubModalOpen} setJoinClubModalOpen={setJoinClubModalOpen}/>
        </div>
    );
}

export default DiscussionBoard;