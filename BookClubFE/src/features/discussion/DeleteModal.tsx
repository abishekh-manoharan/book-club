import React, { useEffect } from 'react';
import { NestedThread, useDeleteThreadMutation } from './discussionSlice';
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";

interface DeleteModalProps {
    hideDeleteModal: boolean,
    setHideDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    thread: NestedThread
}

function DeleteModal({ setHideDeleteModal, thread }: DeleteModalProps) {
    const [deleteThread] = useDeleteThreadMutation();
    const dispatch = useAppDispatch();
    const modal = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close the modal if the user clicks outside of it
        const handler = (e: MouseEvent) => {
            if (e.target === modal.current) {
                setHideDeleteModal(false);
            }
        }

        const currentModal = modal.current;
        currentModal?.addEventListener("click", handler);

        return () => {
            currentModal?.removeEventListener("click", handler);
        }
    }, [setHideDeleteModal]);

    const deleteBtnClickHandler = async () => {
        try {
            await deleteThread(thread.threadId).unwrap();
            setHideDeleteModal(false);
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
        <div ref={modal} className="modal">
            <div className="deleteModalInner">
                <img
                    className="infoLogo"
                    src="/src/assets/images/info.svg"
                />
                <h1 className="warningMain">Are you sure you want to delete this thread?</h1>
                <div className="warningSub mediumText">This action cannot be undone.</div>
                <div className="buttons">
                    <button className="btn" onClick={deleteBtnClickHandler}>Yes, delete</button>
                    <button className="btn" onClick={() => { setHideDeleteModal(false) }}>No, don't delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;