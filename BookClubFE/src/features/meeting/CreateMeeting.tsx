import { useState } from "react"
import { useParams } from "react-router-dom";
import { NewMeeting, useCreateMeetingMutation } from "./meetingSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";

function CreateMeeting () {
    const dispatch = useAppDispatch();
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");

    const [createMeeting] = useCreateMeetingMutation();

    const { clubid, bookid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);


    // getting the current date in the format yyyy-mm-dd to use as a minimum value for the start date of the meeting 
    const now = new Date();
    const minDay = now.getDate()
    const minYear = now.getFullYear()
    const minMonth = now.getMonth() + 1;
    const minDate = `${minYear}-${minMonth < 10 ? "0" + minMonth : minMonth}-${minDay < 10 ? "0" + minDay : minDay}T00:00`;

    const createMeetingClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        const form: HTMLFormElement = document.querySelector(".createMeetingForm")!;
        if(!form.checkValidity()){
            form.reportValidity();
            return;
        }

        const meetingStartDate: HTMLInputElement = document.getElementById("meetingStartDate")! as HTMLInputElement;
        const meetingEndDate: HTMLInputElement = document.getElementById("meetingEndDate")! as HTMLInputElement;

        const newMeeting: NewMeeting = {
            bookId: bookId,
            clubId: clubId,
            name: Name,
            description: Description,
            startTime: new Date(meetingStartDate.value),
            endTime: new Date(meetingEndDate.value),
        }

        try {
            const result = await createMeeting(newMeeting).unwrap();
            console.log(result);
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
        <div>
            <form className="createMeetingForm" hidden>
            Create Meeting
                <label htmlFor="meetingName">Name</label>
                <input id="meetingName" type="text" onChange={(e) => setName(e.target.value)} value={Name} required /> <br />

                <label htmlFor="meetingDescription">Description</label>
                <textarea id="meetingDescription" rows={5} cols={20} onChange={(e) => setDescription(e.target.value)} value={Description} /> <br />
                
                <label htmlFor="meetingStartDate">Meeting Start Time</label>
                {/* <input id="meetingStartDate" type="datetime-local" min={minDate} value="2030-06-12T19:30" required /> <br /> */}
                {/* <input id="meetingStartDate" type="datetime-local" min={minDate} required  value="2025-04-08T19:30"/> <br /> */}
                <input id="meetingStartDate" type="datetime-local" min={minDate} required /> <br />
                <label htmlFor="meetingEndDate">Meeting End Time</label>
                <input id="meetingEndDate" type="datetime-local" required />
                <button onClick={createMeetingClickHandler}>Create</button>
            </form>
        </div>
    );
}

export default CreateMeeting;