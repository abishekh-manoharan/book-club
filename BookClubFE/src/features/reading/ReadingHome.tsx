import { useParams } from "react-router-dom";

function ReadingHome(props) {
    const {clubid, readingid} = useParams()
    return (
        <div>
            <h1>Reading home</h1>
            {clubid}
            {readingid}
        </div>
    );
}

export default ReadingHome;