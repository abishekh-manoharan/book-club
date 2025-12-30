import React from 'react';
import { Meeting, useDeleteMeetingMutation } from './meetingSlice';
import { isFetchBaseQueryError, isSerializedError } from '../../app/typeGuards';
import { updateErrorMessageThunk } from '../error/errorSlice';
import { useAppDispatch } from '../../app/hooks';

interface DeleteModalProps {
    hideDeleteModal: boolean,
    setHideDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    meeting: Meeting
}

function DeleteModal({hideDeleteModal, setHideDeleteModal, meeting}: DeleteModalProps) {
    const dispatch = useAppDispatch();
    
    const [deleteMeeting] = useDeleteMeetingMutation();
    const deleteMeetingBtnClickHandler = async () => {
        try {
            const result = await deleteMeeting(meeting!.meetingId).unwrap();
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
        <div className="deleteModal" hidden={hideDeleteModal}>
            <div className="deleteModalInner">
                Are you sure you want to delete this meeting?
                This action cannot be undone and all reading members will be notified.<br />
                <button onClick={deleteMeetingBtnClickHandler}>delete</button>
                <button onClick={() => { setHideDeleteModal(true) }}>no</button>
            </div>
        </div>
    );
}

export default DeleteModal;