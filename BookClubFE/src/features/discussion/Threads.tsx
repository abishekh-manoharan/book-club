import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads } from "./discussionSlice";
import Thread from "./Thread";

function Threads({bookId, clubId}: {bookId: number, clubId: number}) {
    const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId}));
    console.log("threads");
    console.log(threads);
    return (
        <div>
            {threads.map(thread => <Thread thread={thread}/>)}
        </div>
    );
}

export default Threads;