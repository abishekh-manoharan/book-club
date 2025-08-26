import { useState } from "react";
import { useCreateClubMutation } from "./clubSlice";
import { useNavigate } from "react-router-dom";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { useAppDispatch } from "../../app/hooks";
import { updateErrorMessageThunk } from "../error/errorSlice";

export type CreateClubFormData = {
    name: string,
    description?: string,
    profileImg?: string,
    private: boolean
}

function Create({ backLocation }: { backLocation: string }) { // the backLocation prop is used to indicate where the back button will lead
    const dispatch = useAppDispatch();
    
    const nav = useNavigate();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [privateClub, setPrivateClub] = useState(false);

    const [createClub, { isLoading }] = useCreateClubMutation();

    console.log(backLocation);
    const createButtonClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        // e.stopPropagation();

        const form = document.querySelector(".form.clubCreationForm") as HTMLSelectElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const privateCheckBox: HTMLInputElement | null = document.querySelector(".form.clubCreationForm .privateCheckbox");
        const clubFormData: CreateClubFormData = {
            name, description, profileImg, private: privateCheckBox!.checked
        }

        try {
            const res = await createClub(clubFormData).unwrap()
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
            <div className="createClubHeading">
                <h1>Create A Club</h1>
                <p>Create a club and begin reading with your friends</p>
            </div>
            <form className="form clubCreationForm">
                <label htmlFor="Name">Name</label>
                <input className="textInput" name="Name" id="Name" value={name} onChange={(e) => { setName(e.target.value) }} required /><br />
                <label htmlFor="Description">Description</label>
                <input className="textInput" name="Description" id="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} /><br />
                <label htmlFor="ProfileImg">ProfileImg</label>
                <input className="textInput" name="ProfileImg" id="ProfileImg" value={profileImg} onChange={(e) => { setProfileImg(e.target.value) }} /><br />
                <label htmlFor="Private">Private</label>
                <div className="private">
                    <input className="privateCheckbox" name="Private" id="Private" type="checkbox" checked={privateClub} value="private" disabled={isLoading} onChange={(e) => setPrivateClub(e.target.checked)} />
                    <p className="privateCheckboxInfo">Make your club private if you want greater control over who can join and view your club's activities.</p>
                </div>
                <br />
                <button onClick={createButtonClickHandler}>Create</button>
            </form>
        </div>
    );
}

export default Create;