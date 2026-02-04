import React, { useEffect, useRef, useState } from 'react';
import { NestedThread, NewThreadReply, useReplyToThreadMutation } from './discussionSlice';
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useGetUserIdQuery, useGetUserQuery } from '../auth/authSlice';
import { useGetClubUserQuery } from '../club/clubSlice';
import { useNotifySingleUserMutation } from '../notification/notificationSlice';
import DeleteModal from './DeleteModal';

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

function Thread({ thread, offset, reading }: { thread: NestedThread, offset: number, reading: { bookId: number, clubId: number } }) {
    const [timeAgoDisplay, setTimeAgoDisplay] = useState("");

    const localDate = new Date(thread.timePosted + "Z").toLocaleString();
    
    useEffect(() => {
        setInterval(( )=> {
            setTimeAgoDisplay(timeAgo(localDate));
        }, 60000)
    }, [localDate, setTimeAgoDisplay]);
    

    const replyInput = useRef<HTMLDivElement>(null);

    const [hideDeleteModal, setHideDeleteModal] = useState(false);

    const { data: userId } = useGetUserIdQuery();
    const { data: clubUser } = useGetClubUserQuery({ clubId: reading.clubId, userId: userId! }, { skip: !userId })
    const { data: user } = useGetUserQuery(thread.userId);
    const { data: loggedInUser } = useGetUserQuery(userId!, { skip: !userId });
    const [createReply] = useReplyToThreadMutation();
    const [notifySingleUser] = useNotifySingleUserMutation();


    const dispatch = useAppDispatch();

    const [reply, setReply] = useState("");


    const replyBtnClickHandler = () => {
        replyInput.current?.classList.remove("hidden");
    }
    const closeBtnClickHandler = () => {
        replyInput.current?.classList.add("hidden");
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

            const notificationText = `${loggedInUser?.fName} replied to your post: ${newReply.text}`;
            await notifySingleUser({ UserId: thread.userId, Text: notificationText })
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


    return (
        <div className="threadContainer">
            <>
                {hideDeleteModal &&
                    <DeleteModal hideDeleteModal={hideDeleteModal} setHideDeleteModal={setHideDeleteModal} thread={thread} />
                }
            </>
            <div className="thread" style={{ position: "relative", paddingLeft: offset, textAlign: "left" }}>
                <div className="header">
                    <img src="https://placecats.com/100/100" className="profilePicture" alt='member profile picture' />
                    <div className="name"> {user?.fName} {user?.lName}</div>
                    <div className="timeAgo">{timeAgoDisplay}</div>
                </div>
                <div className="threadText">
                    {thread.deleted ? "This post has been deleted." : thread.text}
                </div>
                <div className="options">
                    <button onClick={replyBtnClickHandler}>reply</button>
                    {(userId === thread.userId || clubUser?.admin) && !thread.deleted && <button onClick={() => setHideDeleteModal(true)}>delete</button>}
                </div>
                <div ref={replyInput} className="hidden">
                    <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
                    <button onClick={commentBtnClickHandler}>comment</button>
                    <button onClick={closeBtnClickHandler}>close</button>
                </div>
            </div>
            {thread.replies.map(replyThread => <Thread thread={replyThread} offset={offset + 30} reading={reading} />)}
        </div>
    );
}

export default Thread;