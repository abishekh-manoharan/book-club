import { useGetClubQuery } from "../../../features/club/clubSlice";
import { useGetBookQuery } from "../../../features/book/bookSlice";
import Progress from "./Progress";
import { useGetReadingMemberCountQuery } from "../readingSlice";
import { Link } from "react-router-dom";

interface OptedInReadingProps {
    clubId: number,
    bookId: number,
    progress: number,
    progressTotal?: number,
    progresstypeId?: number
}

function OptedInReading({ clubId, bookId, progress, progressTotal, progresstypeId }: OptedInReadingProps) {
    const { data: book } = useGetBookQuery(bookId);
    const { data: club } = useGetClubQuery(clubId);
    const { data: readingMemberCount } = useGetReadingMemberCountQuery({ BookId: bookId, ClubId: clubId });

    return (
        <div className="optedInReading activeReadings-reading">
            {book?.cover_Id ?
                <Link className="activeReadings-reading-img" to={`../${book?.bookId}`}><img className="activeReadings-reading-img" src={`https://covers.openlibrary.org/b/ID/${book?.cover_Id}-M.jpg`} /></Link>
                : <Link className="activeReadings-reading-img" to={`../${book?.bookId}`}><img className="activeReadings-reading-img activeReadings-reading-img-noimg" src='/src/assets/images/book-open.svg' /></Link>
            }
            <div className="activeReadings-reading-bookname">
                <Link to={`../${book?.bookId}`}>{book?.title}</Link>
            </div>
            <div className="activeReadings-reading-clubname">
                <Link to={`../${book?.bookId}`}>{club?.name}</Link>
            </div>
            <Link to={`../${book?.bookId}`}><div className="activeReadings-reading-membercount">
                <img className="userLogo user" src='/src/assets/images/user.svg' />
                {readingMemberCount}
            </div></Link>
            <div className="activeReadings-reading-progressOrOptInBtn">
                <Progress bookId={bookId} clubId={clubId} progress={progress} progresstypeId={progresstypeId} progressTotal={progressTotal} />
            </div>
        </div>
    );
}

export default OptedInReading;