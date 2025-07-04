import { useGetClubQuery } from "../../../features/club/clubSlice";
import { useGetBookQuery } from "../../../features/book/bookSlice";
import Progress from "./Progress";

interface OptedInReadingProps {
    clubId: number,
    bookId: number,
    progress?: number,
    progressTotal?: number,
    progresstypeId?: number
}

function OptedInReading({clubId, bookId, progress, progressTotal, progresstypeId}: OptedInReadingProps) {
    const { data: book } = useGetBookQuery(bookId);
    const { data: club } = useGetClubQuery(clubId);

    return (
        <div className="optedInReading activeReadings-reading">
            <div className="activeReadings-reading-img">
                <img src={`https://covers.openlibrary.org/b/ID/${book?.cover_Id}-M.jpg`}/>
            </div>
            <div className="activeReadings-reading-bookname">
                {book?.title}
            </div>
            <div className="activeReadings-reading-clubname">
                {club?.name}
            </div>
            <div className="activeReadings-reading-membercount">
                member count
            </div>
            <div className="activeReadings-reading-progressOrOptInBtn">
                <Progress progress={progress} progresstypeId={progresstypeId} progressTotal={progressTotal}/>
            </div>
        </div>
    );
}

export default OptedInReading;