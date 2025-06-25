import ReadingDetails from "./ReadingDetails";

interface NotOptedInReadingProps {
    clubId: number,
    bookId: number
}

function NotOptedInReading(props: NotOptedInReadingProps) {
    return (
        <div>
            <ReadingDetails bookId={props.bookId} clubId={props.clubId}/>
            {props.bookId}
        </div>
    );
}
export default NotOptedInReading;