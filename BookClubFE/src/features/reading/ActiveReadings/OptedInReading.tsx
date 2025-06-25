import ReadingDetails from "./ReadingDetails";

interface OptedInReadingProps {
    clubId: number,
    bookId: number
}

function OptedInReading(props: OptedInReadingProps) {
    return (
        <div className="optedInReading">
            <ReadingDetails bookId={props.bookId} clubId={props.clubId}/>
            {props.bookId}
        </div>
    );
}

export default OptedInReading;