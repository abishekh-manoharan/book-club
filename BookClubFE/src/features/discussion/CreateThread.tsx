import { useState } from "react";
import { useCreateThreadMutation } from "./discussionSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useNotifyReadingUsersMutation } from "../notification/notificationSlice";
import { useGetUserIdQuery, useGetUserQuery } from "../auth/authSlice";

function CreateThread() {
    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const [text, setText] = useState("");
    
    const [createThread] = useCreateThreadMutation();
    const [notifyReadingUsers] = useNotifyReadingUsersMutation();
    const { data: userId } = useGetUserIdQuery();
    const { data: user, isFetching } = useGetUserQuery(userId!, {skip: !userId});
    
    const dispatch = useAppDispatch();

    const postThreadClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const form = document.querySelector(".discussionPostThreadForm") as HTMLFormElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        try {
            await createThread({ bookId, clubId, text }).unwrap();

            const notificationText = "New post from "+user?.fName+": "+text;
            await notifyReadingUsers({ClubId: clubId, BookId: bookId, Text: notificationText})
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
        <div>
            <form className="discussionPostThreadForm" hidden={isFetching || !user}>
                <textarea value={text} onChange={(e) => setText(e.target.value)} required /><br />
                <button onClick={postThreadClickHandler}>Post</button>
            </form>
        </div>
    );
}

export default CreateThread;