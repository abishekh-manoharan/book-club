import React from 'react';

interface DeleteModalProps {
    hideDeleteModal: boolean,
    setHideDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteModal({hideDeleteModal, setHideDeleteModal}: DeleteModalProps) {
    return (
        <div className="deleteModal" hidden={hideDeleteModal}>
            <div className="deleteModalInner">
                Are you sure you want to delete this meeting?
                This action cannot be undone and all reading members will be notified.<br />
                <button>delete</button>
                <button onClick={() => { setHideDeleteModal(true) }}>no</button>
            </div>
        </div>
    );
}

export default DeleteModal;