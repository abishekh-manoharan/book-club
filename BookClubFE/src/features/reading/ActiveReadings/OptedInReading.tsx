import { useGetClubQuery } from "../../../features/club/clubSlice";
import { useGetBookQuery } from "../../../features/book/bookSlice";

interface OptedInReadingProps {
    clubId: number,
    bookId: number
}

function OptedInReading(props: OptedInReadingProps) {
    const { data: book } = useGetBookQuery(props.bookId);
    const { data: club } = useGetClubQuery(props.clubId);

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
                progress/optin button
            </div>
        </div>
    );
}

export default OptedInReading;