import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads, useGetThreadsQuery } from "./discussionSlice";
import Thread from "./Thread";

function SubThreads() {
    const { clubid, bookid, threadid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);
    
    const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId}));
    
    const {isError, isLoading} = useGetThreadsQuery({BookId: bookId, ClubId: clubId});
    if(isError){
        return "error";
    } else if (isLoading){
        return "loading";
    } 
    
    return (
        <div className="allThreads">
            <Thread thread={threads.threadMap[threadid!]} offset={0} reading={{ bookId, clubId }} depth={0}/>
        </div>
    );
}

export default SubThreads;