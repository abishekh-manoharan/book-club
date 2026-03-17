import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { NestedThread, NewThreadReply, useReplyToThreadMutation } from './discussionSlice';
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useGetUserIdQuery, useGetUserQuery } from '../auth/authSlice';
import { useGetClubUserQuery } from '../club/clubSlice';
import { useNotifySingleUserMutation } from '../notification/notificationSlice';
import DeleteModal from './DeleteModal';
import { useNavigate } from 'react-router-dom';
import Threads from './Threads';

const timeAgo = (input: string | Date) => {
    const date = typeof input === "string" ? new Date(input) : input
    const now = new Date()

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 0) return "just now"

    const intervals: [number, string][] = [
        [60, "second"],
        [60, "minute"],
        [24, "hour"],
        [7, "day"],
        [4.34524, "week"], // avg weeks/month
        [12, "month"],
        [Number.POSITIVE_INFINITY, "year"],
    ]

    let count = seconds
    let unit = "second"

    for (const [threshold, name] of intervals) {
        if (count < threshold) {
            unit = name
            break
        }
        count = Math.floor(count / threshold)
    }

    return `${count} ${unit}${count !== 1 ? "s" : ""} ago`
}

function Thread({ thread, offset, reading, depth, index, root, prev }:
    {
        thread: NestedThread,
        offset: number,
        reading: { bookId: number, clubId: number },
        depth: number,
        index?: number,
        root: boolean,
        prev?: {
            threadId: number | undefined,
            timePosted: string | Date | undefined
        }
    }) {
    const threadElementRef = useRef<HTMLTextAreaElement>();
    const replyInput = useRef<LegacyRef<HTMLDivElement> | undefined>();
    const replyBtnRef = useRef<LegacyRef<HTMLDivElement> | undefined | null>();

    const [timeAgoDisplay, setTimeAgoDisplay] = useState("");
    const [showMoreThreads, setShowMoreThreads] = useState(false);

    const localDate = new Date(thread.timePosted + "Z").toLocaleString();

    useEffect(() => {
        setTimeAgoDisplay(timeAgo(localDate));
        setInterval(() => {
            setTimeAgoDisplay(timeAgo(localDate));
        }, 60000)
    }, [localDate, setTimeAgoDisplay]);

    const [hideDeleteModal, setHideDeleteModal] = useState(false);

    const { data: userId } = useGetUserIdQuery();
    const { data: clubUser } = useGetClubUserQuery({ clubId: reading.clubId, userId: userId! }, { skip: !userId })
    const { data: user } = useGetUserQuery(thread.userId);
    const { data: loggedInUser } = useGetUserQuery(userId!, { skip: !userId });
    const [createReply] = useReplyToThreadMutation();
    const [notifySingleUser] = useNotifySingleUserMutation();


    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const [reply, setReply] = useState("");


    const replyBtnClickHandler = () => {
        replyInput.current?.classList.remove("hidden");
        replyBtnRef.current!.style.display = "none";
        threadElementRef.current!.style.marginBottom = "12dvh";
    }
    const closeBtnClickHandler = () => {
        replyInput.current?.classList.add("hidden");
        replyBtnRef.current!.style.display = "flex";
        threadElementRef.current!.style.marginBottom = "0px";
    }

    const commentBtnClickHandler = async () => {
        const newReply: NewThreadReply = {
            parentthreadid: thread.threadId,
            ...reading,
            text: reply
        }

        try {
            await createReply(newReply).unwrap();
            replyInput.current?.classList.add("hidden");
            replyBtnRef.current?.classList.remove("hidden");
            replyInput.current?.classList.add("hidden");
            replyBtnRef.current!.style.display = "flex";
            threadElementRef.current!.style.marginBottom = "0px";
            threadElementRef.current!.style.marginBottom = "0px";

            // only send notification if user exists and user isnt replying to themselves
            if (userId && userId != thread.userId) {
                const notificationText = `${loggedInUser?.fName} replied to your post: ${newReply.text}`;
                await notifySingleUser({ UserId: thread.userId, Text: notificationText })
            }
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                dispatch(updateErrorMessageThunk("Unknown error occured."));
            }
        }
    }

    const loadReplies = (id: number, parentThreadId: number, timePosted: string 
    | Date) => {
        nav(`/club/${thread.clubId}/${thread.bookId}/discussions/${id}/${timePosted}/${parentThreadId}`)
    }
    
    const loadMoreThreads = () => {
        console.log("click")
        console.log(prev?.threadId)
        console.log(prev?.timePosted)
        setShowMoreThreads(true);
    }

    return (
        <>
            <div className="threadContainer">
                <>
                    {hideDeleteModal &&
                        <DeleteModal hideDeleteModal={hideDeleteModal} setHideDeleteModal={setHideDeleteModal} thread={thread} />
                    }
                </>
                {(index == 2 && !root && depth!=0) || (index != 20) && <>
                    <div className="thread" ref={threadElementRef} style={{ paddingLeft: offset, textAlign: "left" }}>
                        <div className="header">
                            <img src="https://placecats.com/100/100" className="profilePicture" alt='member profile picture' />
                            <div className="name"> {root && "root"} {index} {user?.fName} {user?.lName}</div>
                            <div className="timeAgo">{timeAgoDisplay}</div>
                        </div>
                        <div className="threadText">
                            {thread.deleted ? "This post has been deleted." : thread.text}
                        </div>
                        <div ref={replyBtnRef} className="options">
                            <button onClick={replyBtnClickHandler}>reply</button>
                            {(userId === thread.userId || clubUser?.admin) && !thread.deleted && <button onClick={() => setHideDeleteModal(true)}>delete</button>}
                        </div>
                        <div ref={replyInput} className="reply hidden">
                            <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
                            <div className="buttons">
                                <button onClick={commentBtnClickHandler}>comment</button>
                                <button onClick={closeBtnClickHandler}>close</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Replies to thread */}
                    {depth % 3 == 0 && depth !== 0 && thread.replies.length > 0 ? <a style={{ position: "relative", paddingLeft: offset + 20, textAlign: "left", marginBottom: "7px" }} onClick={() => loadReplies(thread.threadId, thread.parentThreadId, thread.timePosted)}>shows replies a</a> : <>
                        {thread.replies.map((replyThread, i) => <Thread
                            thread={replyThread}
                            offset={offset + 30}
                            reading={reading}
                            depth={depth + 1}
                            index={i}
                            root={false}
                            prev={thread.replies[i - 1]
                                ? {
                                    threadId: thread.replies[i - 1].threadId,
                                    timePosted: thread.replies[i - 1].timePosted
                                }
                                : undefined
                            } />
                        )}
                    </>}
                </>}
                {/* if there is a 21st thread, show the "show more" button*/}
                {!showMoreThreads && index == 20 && <a style={{
                        position: "relative",
                        paddingLeft: offset,
                        textAlign: "left",
                        marginBottom: "7px"
                    }} onClick={loadMoreThreads}>show more</a>} 
                {/* for replies, if there is a 3rd thread, show the "show more" button*/}
                {!showMoreThreads && index == 2 && !root && depth != 0 &&
                    <a style={{
                        position: "relative",
                        paddingLeft: offset,
                        textAlign: "left",
                        marginBottom: "7px"
                    }} onClick={loadMoreThreads}>
                        show more {depth} {index} {root ? "root" : "not root"}
                    </a>
                } 
            </div>

            {/* additional threads after the current one */}
            {
            showMoreThreads ? 
                <Threads clubId={thread.clubId} bookId={thread.bookId} cursorThreadId={prev?.threadId} cursorTimeAgo={prev?.timePosted} parentThreadId={root ? "" : thread.parentThreadId} initialOffset={offset}/>
                : <></>
            }
        </>
    );
}

export default Thread;