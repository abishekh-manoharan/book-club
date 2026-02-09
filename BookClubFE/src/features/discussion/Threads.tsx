import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads } from "./discussionSlice";
import Thread from "./Thread";

function Threads({bookId, clubId}: {bookId: number, clubId: number}) {
    const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId}));
    console.log(threads.rootThreads);
    return (
        <div className="allThreads">
            {threads.rootThreads.map(thread => <Thread thread={thread} offset={0} reading={{ bookId, clubId }} depth={0}/>)}
        </div>
    );
}

export default Threads;