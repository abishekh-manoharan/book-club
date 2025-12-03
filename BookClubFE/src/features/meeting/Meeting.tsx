import { Link, useParams } from "react-router-dom";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useGetClubUserQuery } from "../club/clubSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { Meeting as MeetingType, useDeleteMeetingMutation } from "./meetingSlice";
import React from "react";

function Meeting({ meeting, concluded }: { meeting: MeetingType, concluded: boolean }) {
    const { clubid } = useParams();
    const clubId = Number(clubid);

    const dispatch = useAppDispatch();

    const [deleteMeeting] = useDeleteMeetingMutation();

    const { data: userId } = useGetUserIdQuery();

    const { data: clubUser, isSuccess: clubUserIsSuccess } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );

    const isAdmin = clubUserIsSuccess && clubUser && clubUser.admin;

    const deleteMeetingBtnClick = async () => {
        try {
            const result = await deleteMeeting(meeting.meetingId).unwrap();
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

    
    const startTimeString = new Date(meeting.startTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    
    const startDayString = new Date(meeting.startTime).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    let endTimeString = null;
    if (meeting.endTime) {
        endTimeString = new Date(meeting.endTime!).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    }

    const monthString = new Date(meeting.startTime).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    const dayString = new Date(meeting.startTime).toLocaleDateString("en-US", {
        day: "numeric",
    });

    const endDayString = new Date(meeting.endTime!).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
//  && {startDayString === endDayString ? {endTimeString} : {endTimeString}}
    let endTimeDisplay = ""; 
    if (endTimeString != undefined) {
        console.log("log")
        console.log(startDayString)
        console.log(endDayString)
        if(startDayString === endDayString){
            endTimeDisplay = endTimeString;
        } else {
            endTimeDisplay = `${endDayString}, ${endTimeString}` 
        }
    }

    return (
        <div className="meeting">
            <div className="dropdownButton">
                <Link to={`${meeting.meetingId}/edit`}>
                    <img src="/src/assets/images/edit.svg" />
                </Link>
            </div>
            <div className="meetingDate">
                <div className="date" style={concluded ? {backgroundColor: "rgb(170 69 74)"} : {}}> 
                    <div className="dateContainer">
                        <div className="day">
                            {dayString}
                        </div>
                        <div className="month">
                            {monthString}
                        </div>
                    </div>
                </div>
            </div>
            <div className="meetingInfo">
                <div className="meetingName">
                    {meeting.name}
                </div>
                {meeting.description && <div className="meetingDescription mediumText">
                    {meeting.description}
                </div>
                }
                <div className="meetingTime">
                    <div className="timeLogo">
                        <img src="/src/assets/images/clock.svg" />
                    </div>
                    <div className="time">
                        {startTimeString} - {endTimeDisplay}
                    </div>
                </div>
                {/* {!concluded && isAdmin && <button onClick={deleteMeetingBtnClick}>delete</button>} */}
            </div>
        </div>
    );
}

export default Meeting;