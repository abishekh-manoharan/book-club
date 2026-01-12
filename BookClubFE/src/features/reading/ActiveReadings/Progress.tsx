import { useState } from "react";
import UpdateReadingProgress from "../UpdateReadingProgress";
import ProgressBar from "./ProgressBar";

function Progress({ progress, progresstypeId, progressTotal, clubId, bookId, updateOption }: { progress: number, progressTotal: number | undefined, progresstypeId: number | undefined, bookId: number, clubId: number, updateOption?: boolean }) {
    const [modalShow, setModalShow] = useState(false);
    let progressType: string = "";
    
    switch(progresstypeId) {
        case 1: 
            progressType = "Pages";
            break;
        case 2: 
            progressType = "Chapters";
            break;
        case 3: 
            progressType = "%";
            break;

    }

    return (
        <div className="progress">
            <div className="progressValueContainer">
                <p className="progressValue">
                    {progress} 
                </p>
                <p className="progressType">
                    {progresstypeId == 1 && <>&nbsp;</> || progresstypeId == 2 && <>&nbsp;</>}{progressType}
                </p>
            </div>
            <ProgressBar progress={progress} progresstypeId={progresstypeId} progressTotal={progressTotal} />
            <button className="button" onClick={() => setModalShow((state) => !state)} hidden={updateOption}>Update Progress</button>
            {modalShow && <UpdateReadingProgress progress={progress} progresstypeId={progresstypeId} progressTotalProp={progressTotal} clubid={clubId} bookid={bookId} setModalShow={setModalShow} />}
        </div>
    );
}

export default Progress;