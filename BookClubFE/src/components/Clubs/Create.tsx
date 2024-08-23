import { useState } from "react";
import ClubService from "../../services/club";

function Create() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [profileImg, setProfileImg] = useState('');

    const createButtonClickHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const newClub = { name: name, description: description, profileImg: profileImg };
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

                <button onClick={createButtonClickHandler}>Create</button>
            </form>
        </div>
    );
}

export default Create;