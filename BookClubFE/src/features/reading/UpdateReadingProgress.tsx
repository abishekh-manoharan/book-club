import React, { useRef, useState } from "react";
import { useUpdateReadingProgressMutation } from "./readingSlice";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";


interface UpdateReadingProgressProps {
    clubid: number,
    bookid: number,
    progress: number,
    progressTotalProp: number | undefined,
    progresstypeId: number,
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>
}

function UpdateReadingProgress({ clubid, bookid, setModalShow, progress, progressTotalProp, progresstypeId }: UpdateReadingProgressProps) {
    const form = useRef<HTMLFormElement>(null);

    const [updateReadingProgress] = useUpdateReadingProgressMutation();
    const dispatch = useAppDispatch();

    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const [progressValue, setProgressValue] = useState<number>(progress);
    const [progressTotal, setProgressTotal] = useState<number | undefined>(progressTotalProp);

    const progressType = () => {
        switch (progresstypeId) {
            case 1:
                return "pages";
            case 2:
                return "chapters";
            case 3:
                return "sections";
            default:
                return "chapters";
        }
    };

    // const selectProgressTypeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setProgressType(e.target.value);
    //     setProgressValue(0);
    //     if (e.target.value === "percent") {
    //         setMaxProgressValue("100")
    //         setProgressTotal(100);
    //         if (progressValue! > 100) setProgressValue(100);
    //         return;
    //     }
    //     setMaxProgressValue(progressTotal!.toString())
    // }

    const progressValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const progress = Number(e.target.value);


        // never allow the progress value to exceed progress total
        if (progress > progressTotal!) {
            if (progressTotal != undefined) {
                setProgressValue(progressTotal);
                return;
            }
        }
        setProgressValue(progress);
    }


    const submitClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!form.current?.checkValidity()) {
            form.current?.reportValidity();
        }

        const progress = {
            bookId: bookId,
            clubId: clubId,
            progress: progressValue,
            progressTotal: progressTotal,
            progresstypeId: progresstypeId,
        }


        try {
            await updateReadingProgress(progress).unwrap();
            setModalShow(false);
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                dispatch(updateErrorMessageThunk("Unknown error."));
            }
        }
    }

    return (
        <div className="updateReadingModal">
            <form ref={form}>
                <div className="inputs">
                    {progresstypeId}
                    <label htmlFor="progressValue" className="inline">Currently on:&nbsp;</label>
                    <input onChange={progressValueChangeHandler} value={progressValue} id="progressValue" type="number" min="0" className="progressInputValue inline" required></input>
                    {
                        <>
                            <label htmlFor="progressTotal" className="inline">&nbsp;of total:&nbsp;</label>
                            <input onChange={(e) => {
                                setProgressTotal(Number(e.target.value))
                            }
                            } onBlur={(e) => {
                                // ensure progress total is never less than selected progress value
                                if (Number(e.target.value) < progressValue) {
                                    setProgressTotal(progressValue);
                                }
                            }} value={progressTotal} id="progressTotal" type="number" min={progressValue} className="progressTotal inline" required></input>
                            {progressType()}
                        </>
                    }

                    {/* <select onChange={selectProgressTypeChangeHandler} id="progressTypes" value={progressType} required>
                        <option value="pages">Pages</option>
                        <option value="chapters">Chapters</option>
                        <option value="percent">Percent</option>
                    </select><br /> */}
                </div>
                <div className="buttons">
                    <button onClick={() => { setModalShow(false) }} >close</button>
                    <input type="submit" onClick={submitClickHandler} />
                </div>
            </form>
        </div>
    );
}

export default UpdateReadingProgress;