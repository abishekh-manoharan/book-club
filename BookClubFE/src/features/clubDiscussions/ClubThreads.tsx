import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads, useGetClubThreadsBatchQuery } from "./clubDiscussionSlice";
import ClubThread from "./ClubThread";

function ClubThreads({ clubId, cursorThreadId, cursorTimeAgo, parentThreadId, initialOffset, joinClubModalOpen, setJoinClubModalOpen }: {
    clubId: number,
    cursorThreadId?: number,
    cursorTimeAgo?: string | Date,
    parentThreadId?: number | string | "" | undefined | null,
    initialOffset?: number,
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const defaultCursorValues = {
        CursorThreadId: 0,
        CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString()
    }
    const threads = useAppSelector(
        makeSelectNestedThreads({
            ClubId: clubId,
            CursorThreadId: cursorThreadId ?? defaultCursorValues.CursorThreadId,
            CursorTimeAgo: cursorTimeAgo ?? defaultCursorValues.CursorTimeAgo,
            ParentThreadId: parentThreadId ?? ""
        }
        ));

    const { isError, error, isLoading } = useGetClubThreadsBatchQuery({
        ClubId: clubId,
        CursorThreadId: cursorThreadId ?? defaultCursorValues.CursorThreadId,
        CursorTimeAgo: cursorTimeAgo ?? defaultCursorValues.CursorTimeAgo,
        ParentThreadId: parentThreadId ?? ""
    });
    if (isError) {
        return <div style={{ paddingLeft: initialOffset ?? 0, textAlign: "left" }}>Error</div>;
    } else if (isLoading) {
        return <div style={{ paddingLeft: initialOffset ?? 0, textAlign: "left" }}>Loading</div>;
    }
    
    return (
        <div className="allThreads">
            
            {threads?.rootThreads.map((thread, i) => <ClubThread
                thread={thread}
                offset={initialOffset ?? 0}
                clubId={ clubId }
                depth={0}
                index={i}
                root={parentThreadId ? false : true}
                prev={
                    threads?.rootThreads[i - 1]
                        ? {
                            threadId: threads.rootThreads[i - 1].threadId,
                            timePosted: threads.rootThreads[i - 1].timePosted
                            // timePosted: new Date(
                            //     threads.rootThreads[i - 1].timePosted
                            // ).toTimeString()
                        }
                        : undefined
                }
                joinClubModalOpen={joinClubModalOpen}
                setJoinClubModalOpen={setJoinClubModalOpen}
            />)

            }
        </div>
    );
}

export default ClubThreads;