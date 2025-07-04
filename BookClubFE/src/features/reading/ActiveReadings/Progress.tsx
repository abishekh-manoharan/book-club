import { useUpdateReadingProgressMutation } from "../readingSlice";
import ProgressBar from "./ProgressBar";

function Progress({progress, progresstypeId, progressTotal}: {progress: number | undefined, progressTotal: number | undefined, progresstypeId: number | undefined}) {
    const [updateReadingProgress] = useUpdateReadingProgressMutation();

    return (
        <div>
            {progress}
            <ProgressBar progress={progress} progresstypeId={progresstypeId} progressTotal={progressTotal}/>
        </div>
    );
}

export default Progress;