import React from 'react';
import { Meeting, useDeleteMeetingMutation } from './meetingSlice';
import { isFetchBaseQueryError, isSerializedError } from '../../app/typeGuards';
import { updateErrorMessageThunk } from '../error/errorSlice';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

interface DeleteModalProps {
    hideDeleteModal: boolean,
    setHideDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    meeting: Meeting | undefined
}

function DeleteModal({ hideDeleteModal, setHideDeleteModal, meeting }: DeleteModalProps) {
    const nav = useNavigate();

    const dispatch = useAppDispatch();

    const [deleteMeeting] = useDeleteMeetingMutation();
    const deleteMeetingBtnClickHandler = async () => {
        try {
            await deleteMeeting(meeting!.meetingId).unwrap();
            nav(-1);
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
                <h1 className="warningMain">Are you sure you want to delete this meeting?</h1>
                <div className="warningSub mediumText">This action cannot be undone and all reading members will be notified.</div>
                <div className="buttons">
                    <button className="btn" onClick={deleteMeetingBtnClickHandler}>Yes, delete</button>
                    <button className="btn" onClick={() => { setHideDeleteModal(true) }}>No, don't delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;