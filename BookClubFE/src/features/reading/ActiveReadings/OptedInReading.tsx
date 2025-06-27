// import ReadingDetails from "./ReadingDetails";

interface OptedInReadingProps {
    clubId: number,
    bookId: number
}

function OptedInReading(props: OptedInReadingProps) {
    
    
    return (
        <div className="optedInReading activeReadings-reading">
            {/* <ReadingDetails bookId={props.bookId} clubId={props.clubId}/> */}
            <div className="activeReadings-reading-img">
                image
            </div>
            <div className="activeReadings-reading-bookname">
                {props.bookId}
            </div>
            <div className="activeReadings-reading-clubname">
                {props.clubId}
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