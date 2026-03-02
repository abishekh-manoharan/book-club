import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads, useGetThreadsBatchQuery } from "./discussionSlice";
import Thread from "./Thread";

function Threads({bookId, clubId}: {bookId: number, clubId: number}) {
    const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() }));

    const {isError, error, isLoading} = useGetThreadsBatchQuery({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() });
        if(isError){
            console.log(error)
            return "error";
        } else if (isLoading){
            return "loading";
        }
        else {
            console.log("not error")
        }
    console.log(threads.rootThreads);
    
    return (
        <div className="allThreads">
            {threads.rootThreads.map(thread => <Thread thread={thread} offset={0} reading={{ bookId, clubId }} depth={0}/>)}
        </div>
    );
}

export default Threads;