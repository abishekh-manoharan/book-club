import { useGetClubQuery } from "../../../features/club/clubSlice";
import { useGetBookQuery } from "../../../features/book/bookSlice";

interface OptedInReadingProps {
    clubId: number,
    bookId: number,
    progress?: number,
    progresstypeId?: number
}

function OptedInReading({clubId, bookId, progress, progresstypeId}: OptedInReadingProps) {
    const { data: book } = useGetBookQuery(bookId);
    const { data: club } = useGetClubQuery(clubId);

    console.log('progress');
    console.log(progresstypeId);
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
                123
            </div>
            <div className="activeReadings-reading-progressOrOptInBtn">
                {progress}
            </div>
        </div>
    );
}

export default OptedInReading;