import { useState } from "react";
import ClubService from "../../services/club";

function Create() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [privateClub, setPrivateClub] = useState(false);

    const createButtonClickHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // e.stopPropagation();
    
        const form = document.querySelector(".form.clubCreationForm") as HTMLSelectElement;
        if(!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const privateCheckBox: HTMLInputElement | null = document.querySelector(".form.clubCreationForm .private");

        const newClub = { name: name, description: description, profileImg: profileImg, private: privateCheckBox!.checked };
        ClubService.createClub(newClub).then(res => console.log(res));
    }

    return (
        <div>
            Create Club

            <form className="form clubCreationForm">
                <label htmlFor="Name">Name</label>
                <input name="Name" id="Name" value={name} onChange={(e) => { setName(e.target.value) }} required /><br />
                <label htmlFor="Description">Description</label>
                <input name="Description" id="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} /><br />
                <label htmlFor="ProfileImg">ProfileImg</label>
                <input name="ProfileImg" id="ProfileImg" value={profileImg} onChange={(e) => { setProfileImg(e.target.value) }} /><br />
                <label htmlFor="Private">Private</label>
                <input name="Private" className="private" id="Private" type="checkbox" checked={privateClub} value="private" onChange={(e) => setPrivateClub(e.target.checked)}/>
                <button onClick={createButtonClickHandler}>Create</button>
            </form>
        </div>
    );
}

export default Create;