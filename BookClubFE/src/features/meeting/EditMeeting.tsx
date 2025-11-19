import { useParams } from "react-router-dom";

function EditMeeting() {
    const { meetingId } = useParams();
    return (
        <div>
            Edit Meeting {meetingId}
        </div>
    );
}

export default EditMeeting;