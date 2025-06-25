interface readingDetailsProps {
    clubId: number,
    bookId: number
}

function ReadingDetails(props: readingDetailsProps) {
    return (
        <div>
            {props.bookId}
        </div>
    );
}

export default ReadingDetails;