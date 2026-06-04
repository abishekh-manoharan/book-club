import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { ClubUser } from "../club/clubSlice";
import { makeSelectNestedThreads, makeSelectPinnedNestedThreads, useGetClubThreadsBatchQuery, useGetPinnedThreadsQuery } from "./clubDiscussionSlice";
import ClubThread from "./ClubThread";
import PinnedClubThreadsHeader from "./PinnedClubThreadHeader";
import { preprocessCSS } from "vite";

function ClubThreads({ clubId, cursorThreadId, cursorTimeAgo, parentThreadId, initialOffset, joinClubModalOpen, setJoinClubModalOpen, subThreads, depth, announcementsOnly }: {
    clubId: number,
    cursorThreadId?: number,
    cursorTimeAgo?: string | Date,
    parentThreadId?: number | string | "" | undefined | null,
    initialOffset?: number,
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    subThreads: boolean,
    depth?: number,
    announcementsOnly?: boolean
}) {
    console.log("clubThreads")
    console.log("announcementonly")
    console.log(announcementsOnly)
    const [hidePinned, setHidePinned] = useState(false);
    const [viewOnlyAnnouncement, setViewOnlyAnnouncement] = useState(false);

    const defaultCursorValues = {
        CursorThreadId: 0,
        CursorTimeAgo: new Date("2000-01-01T05:00:00.000Z").toISOString()
    }
    const threads = useAppSelector(
        makeSelectNestedThreads({
            ClubId: clubId,
            CursorThreadId: cursorThreadId ?? defaultCursorValues.CursorThreadId,
            CursorTimeAgo: cursorTimeAgo ?? defaultCursorValues.CursorTimeAgo,
            ParentThreadId: parentThreadId ?? "",
            AnnouncementOnly: announcementsOnly || viewOnlyAnnouncement
        }
        ));

    const { isError, error, isLoading } = useGetClubThreadsBatchQuery({
        ClubId: clubId,
        CursorThreadId: cursorThreadId ?? defaultCursorValues.CursorThreadId,
        CursorTimeAgo: cursorTimeAgo ?? defaultCursorValues.CursorTimeAgo,
        ParentThreadId: parentThreadId ?? "",
        AnnouncementOnly: announcementsOnly || viewOnlyAnnouncement
    });
    if (isError) {
        return <div style={{ paddingLeft: initialOffset ?? 0, textAlign: "left" }}>Error</div>;
    } else if (isLoading) {
        return <div style={{ paddingLeft: initialOffset ?? 0, textAlign: "left" }}>Loading</div>;
    }

    return (
        <div className="allThreads">
            {cursorThreadId == null && <button onClick={() => { // ensure this button is only loaded on the initial thread batch
                setHidePinned((prev) => !prev)
            }}>{hidePinned ? "Show Pinned" : "Hide Pinned"}</button>}

            {cursorThreadId == null && <button onClick={() => { // ensure this button is only loaded on the initial thread batch
                setViewOnlyAnnouncement((prev) => !prev)
            }}>{viewOnlyAnnouncement ? "Hide only announcement" : "Show only announcement"}</button>}
            {/* pinned threads */}

            {!subThreads && !hidePinned &&
                threads?.pinnedRootThreads.map((thread, i) => <ClubThread
                    thread={thread}
                    offset={initialOffset ?? 0}
                    clubId={clubId}
                    depth={depth ?? 0}
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
                    pinned={true}
                    announcementsOnly={viewOnlyAnnouncement}
                />)
            }

            {/* non-pinned threads */}
            {threads?.rootThreads.map((thread, i) => <ClubThread
                thread={thread}
                offset={initialOffset ?? 0}
                clubId={clubId}
                depth={depth ?? 0}
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
                pinned={false}
                announcementsOnly={viewOnlyAnnouncement}
            />)

            }
        </div>
    );
}

export default ClubThreads;