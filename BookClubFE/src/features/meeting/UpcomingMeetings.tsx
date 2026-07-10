import { useMemo } from "react";
import Meeting from "./Meeting";
import { useGetUpcomingMeetingsQuery } from "./meetingSlice";

function UpcomingMeetings() {
    const { data: meetings, isError: isGetMeetingsError } = useGetUpcomingMeetingsQuery();

    // sorting meetings by start date 
    const sortedMeetings = useMemo(() => {
        const meetingsCopy = meetings?.slice();
        const upcomingMeetings = meetingsCopy?.filter(m => { return new Date(m.endTime!).getTime() - new Date(Date.now()).getTime() > 0 }).sort((a, b) => new Date(a.endTime!).getTime() - new Date(b.endTime!).getTime());

        return upcomingMeetings;
        // return meetingsCopy?.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }, [meetings]);

    if (isGetMeetingsError) {
        return <>Error occured retrieving meetings.</>
    }

    return (
        <div className="meetings">
            {meetings?.length === 0 ? <>no meetings to display</> : <>
                {sortedMeetings && sortedMeetings.map((meeting) => {
                    const now = new Date();
                    return <Meeting meeting={meeting} concluded={now.getTime() - new Date(meeting.endTime!).getTime() > 0} />
                }
                )}
            </>
            }
        </div>
    );
}

export default UpcomingMeetings;