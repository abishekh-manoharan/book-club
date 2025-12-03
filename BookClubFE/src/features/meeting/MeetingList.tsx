import { Link, useParams } from "react-router-dom";
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
        const allConcludedMeetings = meetingsCopy?.filter(m => { return new Date(m.endTime!).getTime() - new Date(Date.now()).getTime() < 0 }).sort((a, b) => new Date(b.endTime!).getTime()-new Date(a.endTime!).getTime());
        const firstThreeConcludedMeetings = allConcludedMeetings?.slice(0,3);
        const upcomingMeetings = meetingsCopy?.filter(m => { return new Date(m.endTime!).getTime() - new Date(Date.now()).getTime() > 0 }).sort((a, b) => new Date(a.endTime!).getTime() - new Date(b.endTime!).getTime());

        return {
            concludedMeetings: firstThreeConcludedMeetings,
            upcomingMeetings
        }
        // return meetingsCopy?.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }, [meetings]);

    if (isGetMettingsError) {
        return <>Error occured retrieving meetings.</>
    }

    return (
        <div className="meetings">
            {meetings?.length === 0 ? <>no meetings to display</> : <>
                {sortedMeetings && sortedMeetings.upcomingMeetings && sortedMeetings.upcomingMeetings?.map((meeting) => {
                    const now = new Date();
                    return <Meeting meeting={meeting} concluded={now.getTime() - new Date(meeting.endTime!).getTime() > 0} />
                }
                )}
                <br /><div style={{ marginBottom: '7px', fontSize: "15px" }}>Recently concluded meetings:</div>
                {sortedMeetings && sortedMeetings.upcomingMeetings && sortedMeetings.concludedMeetings?.map((meeting) => {
                    const now = new Date();
                    return <Meeting meeting={meeting} concluded={now.getTime() - new Date(meeting.endTime!).getTime() > 0} />
                }
                )}
            </>}
            <Link to={`/club/${clubid}/${bookid}/meetings/create`}>
                <div className="circleBtn">
                    <img className="ListHeader-plus" src='/src/assets/images/plusNoCircle.svg' />
                </div>
            </Link>
        </div>
    );
}

export default MeetingList;