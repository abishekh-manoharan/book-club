import { useState } from "react";
import AddFavouriteModal from "./AddFavouriteModal";

function AddFavourite() {
    const [showModal, setShowModal] = useState(false);
    return (<>
        <div className="addFavourite" onClick={() => {
            setShowModal(true)
        }}>
            <img src="/src/assets/images/plusNoCircle.svg" alt="" />
        </div>
        {showModal && <AddFavouriteModal setShowModal={setShowModal}/>}
    </>
    );
}

export default AddFavourite;