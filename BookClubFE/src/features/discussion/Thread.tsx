import React, { useRef, useState } from 'react';
import { NestedThread, NewThreadReply, useDeleteThreadMutation, useReplyToThreadMutation } from './discussionSlice';
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useGetUserIdQuery } from '../auth/authSlice';
import { useGetClubUserQuery } from '../club/clubSlice';

function Thread({ thread, offset, reading }: { thread: NestedThread, offset: number, reading: { bookId: number, clubId: number } }) {
    const replyInput = useRef<HTMLDivElement>(null);

    const { data: userId } = useGetUserIdQuery();
    const { data: clubUser } = useGetClubUserQuery({ clubId: reading.clubId, userId: userId! }, { skip: !userId })
    const [deleteThread] = useDeleteThreadMutation();

    const dispatch = useAppDispatch();

    const [reply, setReply] = useState("");

    const [createReply] = useReplyToThreadMutation();

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
            const result = await createReply(newReply).unwrap();
            console.log("Success:", result);
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
    const deleteBtnClickHandler = async () => {
        try {
            const result = await deleteThread(thread.threadId).unwrap();
            console.log("Success:", result);
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
        <div style={{ position: "relative", left: offset, textAlign: "left" }}>
            {thread.deleted ? "deleted post" : thread.text}
            <button onClick={replyBtnClickHandler}>reply</button>
            {(userId === thread.userId || clubUser?.admin) && !thread.deleted && <button onClick={deleteBtnClickHandler}>delete</button>}
            <div ref={replyInput} className="hidden">
                <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
                <button onClick={commentBtnClickHandler}>comment</button>
                <button onClick={closeBtnClickHandler}>close</button>
            </div>
            {thread.replies.map(replyThread => <Thread thread={replyThread} offset={offset + 15} reading={reading} />)}
        </div>
    );
}

export default Thread;