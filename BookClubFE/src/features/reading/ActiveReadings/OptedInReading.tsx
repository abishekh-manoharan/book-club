import { useGetClubQuery } from "../../../features/club/clubSlice";
import { useGetBookQuery } from "../../../features/book/bookSlice";
import Progress from "./Progress";

interface OptedInReadingProps {
    clubId: number,
    bookId: number,
    progress: number,
    progressTotal?: number,
    progresstypeId?: number
}

function OptedInReading({clubId, bookId, progress, progressTotal, progresstypeId}: OptedInReadingProps) {
    const { data: book } = useGetBookQuery(bookId);
    const { data: club } = useGetClubQuery(clubId);

    return (
        <div className="optedInReading activeReadings-reading">
            {book?.cover_Id ? 
                <img className="activeReadings-reading-img" src={`https://covers.openlibrary.org/b/ID/${book?.cover_Id}-M.jpg`} /> 
                : <img className="activeReadings-reading-img activeReadings-reading-img-noimg" src='src/assets/images/book-open.svg' />
            }
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
                <Progress bookId={bookId} clubId={clubId} progress={progress} progresstypeId={progresstypeId} progressTotal={progressTotal}/>
            </div>
        </div>
    );
}

export default OptedInReading;