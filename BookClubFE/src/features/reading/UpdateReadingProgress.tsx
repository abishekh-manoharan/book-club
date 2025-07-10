import React, { useState } from "react";
import { useUpdateReadingProgressMutation } from "./readingSlice";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";


interface UpdateReadingProgressProps {
    clubid: number,
    bookid: number,
    progress: number | undefined, 
    progressTotalProp: number | undefined, 
    progresstypeId: number | undefined ,
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>
}

function UpdateReadingProgress({clubid, bookid, setModalShow, progress, progressTotalProp, progresstypeId}: UpdateReadingProgressProps) {
    console.log('progressTotalProp');
    console.log(progressTotalProp);
    
    const [updateReadingProgress] = useUpdateReadingProgressMutation();
    const dispatch = useAppDispatch();

    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const [progressValue, setProgressValue] = useState(progress);
    const [progressTotal, setProgressTotal] = useState(progressTotalProp);
    const [progressType, setProgressType] = useState(()=>{
        switch(progresstypeId){
            case 1:
                return "pages";
            case 2:
                return "chapters";
            case 3:
                return "percent";
            default:
                return "percent";
        }
    });
    const [maxProgressValue, setMaxProgressValue] = useState("");

    console.log("--progresstype")
    console.log(progresstypeId)

    const selectProgressTypeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProgressType(e.target.value);
        setProgressValue(0);
        if (e.target.value === "percent") {
            setMaxProgressValue("100")
            setProgressTotal(100);
            if (progressValue! > 100) setProgressValue(100);
            return;
        }
        setMaxProgressValue(progressTotal!.toString())
    }

    const progressValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const progress = Number(e.target.value);

        if (progressType === "percent" && progress > 100) {
            setProgressValue(100);
            return;
        } else {
            if(progress > progressTotal!){
                setProgressValue(progressTotal);
                return;
            }
        }
        setProgressValue(progress);
    }

    const submitClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        let typeId; 
        if(progressType === "pages"){
            typeId = 1;
        } else if (progressType === "chapters"){
            typeId = 2;
        } else {
            typeId = 3;
        }

        const progress = {
            bookId: bookId,
            clubId: clubId,
            progress: progressValue,
            progressTotal: progressTotal,
            progresstypeId: typeId,
        }

        try {
            const result = await updateReadingProgress(progress).unwrap();
            console.log("Success:", result);
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
        <div >
            <h4>update reading progress</h4>
            <form>
                <label htmlFor="progressValue">Progress:</label>
                <input onChange={progressValueChangeHandler} value={progressValue} id="progressValue" type="number" min="0" max={maxProgressValue} required></input>
                {
                    progressType != "percent" && <>
                    <label htmlFor="progressTotal">Progress Total:</label>
                    <input onChange={(e)=>setProgressTotal(Number(e.target.value))} value={progressTotal} id="progressTotal" type="number" min="0" required></input>
                    </>
                }
                <label htmlFor="progressTypes">Choose a type:</label>
                <select onChange={selectProgressTypeChangeHandler} id="progressTypes" value={progressType} required>
                    <option value="pages">Pages</option>
                    <option value="chapters">Chapters</option>
                    <option value="percent">Percent</option>
                </select>
                <input type="submit" onClick={submitClickHandler} />
                <button onClick={()=>{setModalShow(false)}} >close</button>
            </form>
        </div>
    );
}

export default UpdateReadingProgress;