import React from 'react';
import { NestedClubThread, usePinClubThreadMutation, useUnpinClubThreadMutation } from '../clubDiscussionSlice';
import { isFetchBaseQueryError, isSerializedError } from "../../../app/typeGuards";
import { updateErrorMessageThunk } from "../../error/errorSlice";
import { useAppDispatch } from "../../../app/hooks";

function PinOrUnpinItem({ thread, setOpen }: { thread: NestedClubThread, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [pinThread] = usePinClubThreadMutation()
    const [unpinThread] = useUnpinClubThreadMutation()
    const dispatch = useAppDispatch();

    const pinThreadBtnHandler = async () => {
        try {
            await pinThread(thread.threadId).unwrap();
            setOpen(false); // close dropdown menu if successful
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

    const unpinThreadBtnHandler = async () => {
        try {
            await unpinThread(thread.threadId).unwrap();
            setOpen(false); // close dropdown menu if successful
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
        thread.pinned ?
            <div className="dropdownItem" onClick={unpinThreadBtnHandler}>
                Unpin Thread
            </div>
            :
            <div className="dropdownItem" onClick={pinThreadBtnHandler}>
                Pin Thread
            </div>
    );
}

export default PinOrUnpinItem;