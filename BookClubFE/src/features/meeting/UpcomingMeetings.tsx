import { useGetUpcomingMeetingsQuery } from "./meetingSlice";

function UpcomingMeetings() {
    const {data: upcomingMeetings} = useGetUpcomingMeetingsQuery();

    console.log(upcomingMeetings);

    return (
        <div>
            upcoming Meetings page
        </div>
    );
}

export default UpcomingMeetings;