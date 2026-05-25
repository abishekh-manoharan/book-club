import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads, useGetThreadsBatchQuery } from "./clubDiscussionSlice";
import Threads from "./ClubThreads";
import ClubThreads from "./ClubThreads";

function ClubSubThreads({ joinClubModalOpen, setJoinClubModalOpen }: {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const { clubid, threadid, cursorTimeAgo, parentThreadid } = useParams()

    const clubId = Number(clubid);
    const threadId = Number(threadid);
    const parentThreadId = Number(parentThreadid);



    // const threads = useAppSelector(makeSelectNestedThreads({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() }));

    // const {isError, isLoading} = useGetThreadsBatchQuery({BookId: bookId, ClubId: clubId, CursorThreadId: 0, CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString() });
    // if(isError){
    //     return "error";
    // } else if (isLoading){
    //     return "loading";
    // } 
    console.log("threadId")
    console.log("threadId")
    console.log("threadId")
    console.log("threadId")
    console.log(threadId)

    return (
        // <div className="allThreads">
        //     <Thread thread={threads.threadMap[threadid!]} offset={0} reading={{ bookId, clubId }} depth={0} root={true}/>
        // </div>
        <ClubThreads clubId={clubId} parentThreadId={threadId} cursorThreadId={parentThreadId} setJoinClubModalOpen={setJoinClubModalOpen} joinClubModalOpen={joinClubModalOpen} subThreads={true}/>
    );
}

export default ClubSubThreads;