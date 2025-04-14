import { useState } from "react";
import { useCreateThreadMutation } from "./discussionSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";

function CreateThread() {
    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const [text, setText] = useState("");
    const [createThread] = useCreateThreadMutation();

    const dispatch = useAppDispatch();

    const postThreadClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const form = document.querySelector(".discussionPostThreadForm") as HTMLFormElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        try {
            const result = await createThread({ bookId, clubId, text }).unwrap();
            console.log(result);
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
            <form className="discussionPostThreadForm">
                <textarea value={text} onChange={(e) => setText(e.target.value)} required /><br />
                <button onClick={postThreadClickHandler}>Post</button>
            </form>
        </div>
    );
}

export default CreateThread;