import { useParams } from "react-router-dom";
import { useGetAllMeetingsQuery } from "./meetingSlice";
import { useMemo } from "react";
import Meeting from "./Meeting";

function MeetingList() {
    const { clubid, bookid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: meetings, isError: isGetMettingsError } = useGetAllMeetingsQuery({ clubId, bookId });

    // sorting meetings by start date 
    const sortedMeetings = useMemo(() => {
        const meetingsCopy = meetings?.slice();
        const concludedMeetings = meetingsCopy?.filter(m => { return new Date(m.endTime!).getTime() - Date.now() < 0 }).sort((a, b) => new Date(a.endTime!).getTime() - new Date(b.endTime!).getTime());
        const upcomingMeetings = meetingsCopy?.filter(m => { return new Date(m.endTime!).getTime() - Date.now() > 0 }).sort((a, b) => new Date(a.endTime!).getTime() - new Date(b.endTime!).getTime());

        return {
            concludedMeetings,
            upcomingMeetings
        }
        // return meetingsCopy?.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }, [meetings]);

    if (isGetMettingsError) {
        return <>Error occured retrieving meetings.</>
    }

    return (
        <div>
            <h3>Meetings</h3>
            {meetings?.length === 0 ? <>no meetings to display</> : <>
                <>upcomingMeetings</>
                {sortedMeetings && sortedMeetings.upcomingMeetings && sortedMeetings.upcomingMeetings?.map((meeting) => {
                    const now = new Date();
                    return <Meeting meeting={meeting} concluded={now.getTime() - new Date(meeting.endTime!).getTime() > 0} />
                }
                )}
                <br/><>concludedMeetings</>
                {sortedMeetings && sortedMeetings.upcomingMeetings && sortedMeetings.concludedMeetings?.map((meeting) => {
                    const now = new Date();
                    return <Meeting meeting={meeting} concluded={now.getTime() - new Date(meeting.endTime!).getTime() > 0} />
                }
                )}
            </>}
        </div>
    );
}

export default MeetingList;