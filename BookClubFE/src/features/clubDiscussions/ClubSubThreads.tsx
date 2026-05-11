import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads, useGetThreadsBatchQuery } from "./clubDiscussionSlice";
import Threads from "./ClubThreads";
import ClubThreads from "./ClubThreads";

function ClubSubThreads() {
    const { clubid, threadid, cursorTimeAgo, parentThreadid } = useParams()

    const clubId = Number(clubid);
    const threadId = Number(threadid);

    
    
    // const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() }));
    
    // const {isError, isLoading} = useGetThreadsBatchQuery({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() });
    // if(isError){
    //     return "error";
    // } else if (isLoading){
    //     return "loading";
    // } 
    
    return (
        // <div className="allThreads">
        //     <Thread thread={threads.threadMap[threadid!]} offset={0} reading={{ bookId, clubId }} depth={0} root={true}/>
        // </div>
        <ClubThreads clubId={clubId} parentThreadId={threadId} />
    );
}

export default ClubSubThreads;