import { useState } from "react";
import UpdateReadingProgress from "../UpdateReadingProgress";
import ProgressBar from "./ProgressBar";

function Progress({progress, progresstypeId, progressTotal, clubId, bookId}: {progress: number | undefined, progressTotal: number | undefined, progresstypeId: number | undefined, bookId: number, clubId: number}) {
    const [modalShow, setModalShow] = useState(false);
    console.log("-P")
    console.log(progressTotal)
    return (
        <div>
            {progress}
            <ProgressBar progress={progress} progresstypeId={progresstypeId} progressTotal={progressTotal}/>
            <button className="button" onClick={() => setModalShow((state) => !state)}>Update Progress</button>
            {modalShow && <UpdateReadingProgress progress={progress} progresstypeId={progresstypeId} progressTotalProp={progressTotal} clubid={clubId} bookid={bookId} setModalShow={setModalShow}/>}
        </div>
    );
}

export default Progress;