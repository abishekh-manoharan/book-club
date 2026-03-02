import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads, useGetThreadsBatchQuery } from "./discussionSlice";
import Thread from "./Thread";

function SubThreads() {
    const { clubid, bookid, threadid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);
    
    const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() }));
    
    const {isError, isLoading} = useGetThreadsBatchQuery({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() });
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