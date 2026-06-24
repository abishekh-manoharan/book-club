import { useMemo } from "react";
import { useGetAllRSVPsOfMeetingQuery } from "./meetingSlice";
import RSVPedMember from "./RSVPedMember";

function RSVPedMembers({ meetingId }: { meetingId: number }) {
    const { data: rsvps } = useGetAllRSVPsOfMeetingQuery(meetingId);

    const grouped = useMemo(() => {
        if (!rsvps) return undefined;

        return {
            yes: rsvps.filter(r => r.rsvp === "yes"),
            no: rsvps.filter(r => r.rsvp === "no"),
            maybe: rsvps.filter(r => r.rsvp === "maybe"),
        };
    }, [rsvps]);
    return (
        <div className="rsvpedMembers">
            {grouped && grouped?.yes.length > 0 && <div className="rsvpedMembersGroup">
                <div className="rsvpedMembersGroupHeader yes">
                    <img src="/src/assets/images/check.svg" />
                    <span>Yes, I'll be there</span>
                </div>
                <div className="rsvpMembersGroupNames">
                    {grouped?.yes.map((rsvp) => {
                        return <RSVPedMember fName={rsvp.fName} lName={rsvp.lName} />
                    })}
                </div>
            </div>}
            {grouped && grouped?.maybe.length > 0 && <div className="rsvpedMembersGroup">
                <div className="rsvpedMembersGroupHeader maybe">
                    <img src="/src/assets/images/question.svg" />
                    <span>I'm not sure if I'll be there</span>
                </div>
                <div className="rsvpMembersGroupNames">
                    {grouped?.maybe.map((rsvp) => {
                        return <RSVPedMember fName={rsvp.fName} lName={rsvp.lName} />
                    })}
                </div>
            </div>}
            {grouped && grouped?.no.length > 0 && <div className="rsvpedMembersGroup">
                <div className="rsvpedMembersGroupHeader maybe">
                    <img src="/src/assets/images/x.svg" />
                    <span>I won't be able to make it</span>
                </div>
                <div className="rsvpMembersGroupNames">
                    {grouped?.no.map((rsvp) => {
                        return <RSVPedMember fName={rsvp.fName} lName={rsvp.lName} />
                    })}
                </div>
            </div>}
        </div>
    );
}

export default RSVPedMembers;