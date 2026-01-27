import { useRef, useState } from "react";
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
    const ref = useRef<HTMLTextAreaElement | null>(null);

    const resize = () => {
        if (!ref.current) return;
        ref.current.style.height = "18px";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    };

    const [text, setText] = useState("");
    const [active, setActive] = useState(false);

    const [createThread] = useCreateThreadMutation();
    const [notifyReadingUsers] = useNotifyReadingUsersMutation();
    const { data: userId } = useGetUserIdQuery();
    const { data: user, isFetching } = useGetUserQuery(userId!, { skip: !userId });

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

            const notificationText = "New post from " + user?.fName + ": " + text;
            await notifyReadingUsers({ ClubId: clubId, BookId: bookId, Text: notificationText })
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
                <div className="pfpAndText">

                    <img src="https://placecats.com/100/100" className="profilePicture" alt='member profile picture' />
                    <textarea className="discussionCreateThreadTextArea" ref={ref} value={text} onChange={(e) => setText(e.target.value)} onFocus={() => { resize(); setActive(true); }} onInput={resize} required /><br />
                </div>
                <button onClick={postThreadClickHandler} hidden={!active}>Post</button>
                <input type="button" value="Cancel" onClick={() => {
                    setActive(false); if (!ref.current) return;
                    if (ref.current.value === "" || ref.current.value === " ") { ref.current.style.height = "18px"; }
                }} hidden={!active} />
            </form>
        </div>
    );
}

export default CreateThread;