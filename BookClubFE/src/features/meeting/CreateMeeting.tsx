import { useState } from "react"
import { useParams } from "react-router-dom";
import { NewMeeting, useCreateMeetingMutation } from "./meetingSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNotifyReadingUsersMutation } from "../notification/notificationSlice";
import { useGetOneReadingQuery } from "../reading/readingSlice";

function CreateMeeting() {
    const dispatch = useAppDispatch();
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<string | undefined>();

    const [createMeeting] = useCreateMeetingMutation();
    const [notifyReadingUsers] = useNotifyReadingUsersMutation();

    const { clubid, bookid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: reading } = useGetOneReadingQuery({ BookId: bookId, ClubId: clubId }, { skip: isNaN(clubId) || isNaN(bookId) });


    // getting the current date in the format yyyy-mm-dd to use as a minimum value for the start date of the meeting 
    const now = new Date();
    const minDay = now.getDate()
    const minYear = now.getFullYear()
    const minMonth = now.getMonth() + 1;
    const minDate = `${minYear}-${minMonth < 10 ? "0" + minMonth : minMonth}-${minDay < 10 ? "0" + minDay : minDay}T00:00`;

    const createMeetingClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const form: HTMLFormElement = document.querySelector(".createMeetingForm")!;
        if (!form.checkValidity()) {
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

        console.log(newMeeting);

        try {
            const result = await createMeeting(newMeeting).unwrap();
            const result2 = await notifyReadingUsers({
                ClubId: clubId,
                BookId: bookId,
                Text: `New meeting created in ${reading?.name}`
            })
                .unwrap();
            console.log(result + " " + result2);
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
        <div className="createClubPage">
            <div className="createClubHeading"><h1>Create A Meeting</h1><p>Create a meeting and meet with your friends!</p></div>
            <form className="createMeetingForm">
                <label htmlFor="meetingName">Name*</label>
                <input className="textInput" id="meetingName" type="text" onChange={(e) => setName(e.target.value)} value={Name} required /> <br />

                <label htmlFor="meetingDescription">Description</label>
                <textarea className="textInput" id="meetingDescription" style={{height: "auto"}} rows={5} cols={20} onChange={(e) => setDescription(e.target.value)} value={Description} /> <br />

                <label htmlFor="meetingStartDate">Meeting Start Time*</label>
                {/* <input id="meetingStartDate" type="datetime-local" min={minDate} value="2030-06-12T19:30" required /> <br /> */}
                {/* <input id="meetingStartDate" type="datetime-local" min={minDate} required  value="2025-04-08T19:30"/> <br /> */}
                <input className="textInput" id="meetingStartDate" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}  min={minDate} required /> <br />
                <label htmlFor="meetingEndDate">Meeting End Time</label>
                <input className="textInput" id="meetingEndDate" type="datetime-local" min={startDate ?? minDate} required />
                {/* <input className="textInput" id="meetingEndDate" type="datetime-local" required /> */}
                <button onClick={createMeetingClickHandler}>Create</button>
            </form>
        </div>
    );
}

export default CreateMeeting;