import { useParams } from "react-router-dom";
import CreateThread from "./CreateThread";
import { useGetThreadsQuery } from "./discussionSlice";
import Threads from "./Threads";

function DiscussionBoard() {
    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const {isError, isLoading} = useGetThreadsQuery({BookId: bookId, ClubId: clubId});
    if(isError){
        return "error";
    } else if (isLoading){
        return "loading";
    }
    
    return (
        <div>
            <CreateThread />
            <Threads clubId={clubId} bookId={bookId}/>
        </div>
    );
}

export default DiscussionBoard;