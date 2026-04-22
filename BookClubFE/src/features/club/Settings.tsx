import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useGetClubQuery, useUpdateClubMutation } from "./clubSlice";

export type UpdateClubFormData = {
    ClubId: number,
    Name: string,
    Description: string,
    ProfileImg: string,
    Private: boolean
}

function Settings() {
    const nav = useNavigate();
    const dispatch = useAppDispatch();


    const { clubid } = useParams();
    const clubId = Number(clubid);

    const { data: club } = useGetClubQuery(clubId);
    const [update, {isLoading}] = useUpdateClubMutation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [privateStatus, setPrivateStatus] = useState(false);

    useEffect(() => {
        if (club) {
            setName(club.name);
            setDescription(club.description ?? "");
            setPrivateStatus(club.private);
        }
    }, [club]);

    const updateClubBtnClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        // e.stopPropagation();

        const form = document.querySelector(".createClubPage .updateClubForm") as HTMLSelectElement;

        console.log(form)

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const privateCheckBox: HTMLInputElement | null = document.querySelector(".updateClubForm .privateCheckbox");
        const clubFormData: UpdateClubFormData = {
            ClubId: clubId,
            Name: name,
            Description: description,
            ProfileImg: club?.profileImg ?? "",
            Private: privateCheckBox!.checked
        }

        try {
            const res = await update(clubFormData).unwrap()
            nav(`/club/${res.clubId}`);
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
        <div className="createClubPage">
            <div className="createClubHeading"><h1>Club Settings</h1><p>Update your club settings.</p></div>
            <form className="createMeetingForm updateClubForm">
                <label htmlFor="meetingName">Name*</label>
                <input className="textInput" id="meetingName" type="text" onChange={(e) => setName(e.target.value)} value={name} required /> <br />

                <label htmlFor="meetingDescription">Description</label>
                <textarea className="textInput" id="meetingDescription" style={{ height: "auto" }} rows={5} cols={20} onChange={(e) => setDescription(e.target.value)} value={description} /> <br />

                <label htmlFor="Private">Private</label>
                <div className="private">
                    <input className="privateCheckbox" name="Private" id="Private" type="checkbox" checked={privateStatus} value="private" disabled={isLoading} onChange={(e) => setPrivateStatus(e.target.checked)} />
                    <p className="privateCheckboxInfo">Make your club private if you want greater control over who can join and view your club's activities.</p>
                </div>

                <button onClick={updateClubBtnClickHandler}>Update</button>
            </form>
        </div>
    );
}

export default Settings;