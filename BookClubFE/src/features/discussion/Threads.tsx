import { useAppSelector } from "../../app/hooks";
import { makeSelectNestedThreads, useGetThreadsBatchQuery } from "./discussionSlice";
import Thread from "./Thread";

function Threads({ bookId, clubId, cursorThreadId, cursorTimeAgo }: { bookId: number, clubId: number, cursorThreadId?: number, cursorTimeAgo?: string }) {
    const defaultCursorValues = {
        CursorThreadId: 0,
        CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString()
    }
    const threads = useAppSelector(
        makeSelectNestedThreads({
            BookId: bookId,
            ClubId: clubId,
            CursorThreadId: cursorThreadId ?? defaultCursorValues.CursorThreadId,
            CursorTimeAgo: cursorTimeAgo ?? defaultCursorValues.CursorTimeAgo,
        }
        ));

    console.log(threads?.rootThreads)
    const { isError, error, isLoading } = useGetThreadsBatchQuery({
        BookId: bookId,
        ClubId: clubId,
        CursorThreadId: cursorThreadId ?? defaultCursorValues.CursorThreadId,
        CursorTimeAgo: cursorTimeAgo ?? defaultCursorValues.CursorTimeAgo,
    });
    if (isError) {
        console.log(error)
        return "error";
    } else if (isLoading) {
        return "loading";
    }
    else {
        console.log("not error")
    }
    console.log(threads.rootThreads);

    return (
        <div className="allThreads">
            {threads?.rootThreads.map((thread, i) => <Thread
                thread={thread}
                offset={0}
                reading={{ bookId, clubId }}
                depth={0}
                index={i}
                root={true}
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
                } />)

            }
        </div>
    );
}

export default Threads;