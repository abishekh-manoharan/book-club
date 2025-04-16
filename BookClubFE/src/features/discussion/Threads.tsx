import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads } from "./discussionSlice";
import Thread from "./Thread";

function Threads({bookId, clubId}: {bookId: number, clubId: number}) {
    const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId}));
    return (
        <div>
            {threads.map(thread => <Thread thread={thread} offset={0}/>)}
        </div>
    );
}

export default Threads;