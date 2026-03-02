import { useParams } from "react-router-dom";
import CreateThread from "./CreateThread";
// import { useGetThreadsQuery } from "./discussionSlice";
import Threads from "./Threads";
// import { useGetThreadsBatchQuery } from "./discussionSlice";

function DiscussionBoard() {
    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);
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
            <CreateThread />
            <Threads clubId={clubId} bookId={bookId}/>
        </div>
    );
}

export default DiscussionBoard;