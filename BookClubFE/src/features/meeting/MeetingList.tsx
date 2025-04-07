import { useParams } from "react-router-dom";
import { useGetAllMeetingsQuery } from "./meetingSlice";

function MeetingList() {
    const { clubid, bookid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const {data: meetings} = useGetAllMeetingsQuery({clubId, bookId});
    return (
        <div>
            <h3>Meetings</h3>
            {meetings && meetings.map((meeting)=><div>{meeting.meetingId}</div>)}
        </div>
    );
}

export default MeetingList;