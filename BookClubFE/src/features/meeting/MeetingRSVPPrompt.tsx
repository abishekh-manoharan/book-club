import { useGetOneRSVPOfMeetingQuery, useUpsertMeetingRSVPMutation } from "./meetingSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";


function MeetingRSVPPrompt({ meetingId }: { meetingId: number }) {
    const { data: rsvp } = useGetOneRSVPOfMeetingQuery(meetingId);
    const [upsert] = useUpsertMeetingRSVPMutation();
    const dispatch = useAppDispatch();

    const setRSVP = async (status: "yes" | "no" | "maybe") => {
        try {
            await upsert({meetingId: meetingId, rsvp: status}).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                dispatch(updateErrorMessageThunk("Unknown error occured."));
            }
        }
    }

    return (
        <div className="rsvpPrompt">
            <div className="rsvpPromptQuestion">
                Are you attending?
            </div>
            <div className="rsvpPromptOptions">
                <div onClick={() => setRSVP("yes")} className={`rsvpPromptOption ${rsvp?.rsvp === "yes" ? " selected" : ""}`}>
                    Yes
                </div>
                <div onClick={() => setRSVP("no")} className={`rsvpPromptOption ${rsvp?.rsvp === "no" ? " selected" : ""}`}>
                    No
                </div>
                <div onClick={() => setRSVP("maybe")} className={`rsvpPromptOption ${rsvp?.rsvp === "maybe" ? " selected" : ""}`}>
                    Maybe
                </div>
            </div>
        </div>
    );
}

export default MeetingRSVPPrompt;