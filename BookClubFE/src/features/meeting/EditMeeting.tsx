import { useParams } from "react-router-dom";
import { useGetOneMeetingQuery } from "./meetingSlice";

function EditMeeting() {
    const { meetingId } = useParams();
    const meetingid = Number(meetingId);

    const {data: meeting} = useGetOneMeetingQuery(meetingid, {skip: !meetingid || isNaN(meetingid)});

    return (
        <div>
            Edit Meeting 
        </div>
    );
}

export default EditMeeting;