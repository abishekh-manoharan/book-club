import { useRef, useState } from "react";
import { useCreateClubThreadMutation } from "./clubDiscussionSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useGetUserIdQuery, useGetUserQuery } from "../auth/authSlice";

function CreateClubThread() {
    const { clubid } = useParams()
    const clubId = Number(clubid);
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const resize = () => {
        if (!ref.current) return;
        ref.current.style.height = "18px";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    };

    // form components
    const [header, setHeader] = useState("");
    const [text, setText] = useState("");
    const [announcementFlag, setAnnouncementFlag] = useState(false);
    const [pinnedFlag, setPinnedFlag] = useState(false);

    const [active, setActive] = useState<boolean>(false);

    const [createClubThread] = useCreateClubThreadMutation();
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
            await createClubThread({ clubId, text, heading: header, announcement: announcementFlag, pinned: pinnedFlag }).unwrap();

            // clearing and deactivating post creation form
            setText("");
            setActive(false);
            if (ref.current) ref.current.style.height = "18px";
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

    const cancelPostClickHandler = () => {
        setActive(false);
        if (!ref.current) return;
        setText("");
        ref.current.style.height = "28px";
    }


    return (
        <div>
            <form className="discussionPostThreadForm" hidden={isFetching || !user}>
                <div className="pfpAndText" >
                    {announcementFlag && active && <>
                        <label htmlFor="Header" style={{ alignSelf: "start", marginLeft: "2px" }}>Header <i>(optional)</i></label>
                        <input className="textInput" id="Header" value={header} onChange={(e) => { setHeader(e.target.value) }} required />
                        <label htmlFor="message" style={{ alignSelf: "start", marginLeft: "2px" }}>Message*</label>
                    </>
                    }


                    <textarea className="textInput" id="message" placeholder={active == false ? "Join the conversation" : ""} ref={ref} value={text} onChange={(e) => setText(e.target.value)} onFocus={() => { resize(); setActive(true); }} onInput={resize} required />
                </div>
                {active && <div className="buttons">
                    <label style={{ marginTop: "-1px" }} htmlFor="announcement">Announcement</label>
                    <input className="announcementFlag" name="announcement" id="announcement" type="checkbox" checked={announcementFlag} value="announcement" onChange={(e) => setAnnouncementFlag(e.target.checked)} />

                    <label style={{ marginTop: "-1px" }} htmlFor="pinned">Pinned</label>
                    <input className="pinnedFlag" style={{ marginRight: "auto" }} name="pinned" id="pinned" type="checkbox" checked={pinnedFlag} value="pinned" onChange={(e) => setPinnedFlag(e.target.checked)} />

                    <button className="button" onClick=
                        {postThreadClickHandler} >Post</button>
                    <input className="button" type="button" value="Cancel" onClick={cancelPostClickHandler} />
                </div>}
            </form>
        </div>
    );
}

export default CreateClubThread;