import { useParams } from "react-router-dom";
import { useGetAllMeetingsQuery } from "./meetingSlice";
import { useMemo } from "react";

function MeetingList() {
    const { clubid, bookid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: meetings, isError: isGetMettingsError } = useGetAllMeetingsQuery({ clubId, bookId });

    // sorting meetings by start date 
    const sortedMeetings = useMemo(() => {
        const meetingsCopy = meetings?.slice();
        return meetingsCopy?.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }, [meetings]);

    console.log(sortedMeetings);

    if (isGetMettingsError) {
        return <>Error occured retrieving meetings.</>
    }

    return (
        <div>
            <h3>Meetings</h3>
            {meetings?.length === 0 ? <>no meetings to display</> : <>
                {sortedMeetings && sortedMeetings.map((meeting) => <div>{meeting.startTime}{meeting.name}</div>)}
            </>}
        </div>
    );
}

export default MeetingList;