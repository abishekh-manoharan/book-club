import { Link, useParams } from "react-router-dom";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useGetClubUserQuery } from "../club/clubSlice";
import { Meeting as MeetingType, useGetConfirmedAttendeesCountQuery, useGetRSVPCountQuery } from "./meetingSlice";
import React, { useState } from "react";
import MeetingRSVPPrompt from "./MeetingRSVPPrompt";
import RSVPedMembers from "./RSVPedMembers";

function Meeting({ meeting, concluded }: { meeting: MeetingType, concluded: boolean }) {
    const { clubid } = useParams();
    const clubId = Number(clubid);

    const { data: userId } = useGetUserIdQuery();

    const { data: clubUser, isSuccess: clubUserIsSuccess } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );
    const { data: confirmedAttendeeCount } = useGetConfirmedAttendeesCountQuery(meeting.meetingId);

    const { data: rsvpCount } = useGetRSVPCountQuery(meeting.meetingId);


    const [showRSVPedMembers, setShowRSVPedMembers] = useState(false);

    const isClubMember = clubUserIsSuccess && clubUser;
    const isAdmin = isClubMember && clubUser.admin;

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
        if (startDayString === endDayString) {
            endTimeDisplay = endTimeString;
        } else {
            endTimeDisplay = `${endDayString}, ${endTimeString}`
        }
    }

    return (
            <div className="meetingContainer">
                <div className="meeting">
                    {/* edit button */}

                    {/* meeting date display */}
                    <div className="meetingDate">
                        <div className="date" style={concluded ? { backgroundColor: "rgb(170 69 74)" } : {}}>
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

                    {/* meeting info section*/}
                    <div className="meetingInfo">
                        <div className="meetingNameAndEditBtn">
                            <div className="meetingName">
                                {meeting.name}
                            </div>
                            {isAdmin && !concluded &&
                                <div className="dropdownButton">
                                    <Link to={`${meeting.meetingId}/edit`}>
                                        <img src="/src/assets/images/edit.svg" />
                                    </Link>
                                </div>
                            }
                        </div>
                        <div className="meetingTime">
                            <div className="timeLogo">
                                <img src="/src/assets/images/clock.svg" />
                            </div>
                            <div className="time">
                                {startTimeString} - {endTimeDisplay}
                            </div>
                        </div>
                        <div className="attendeesCount" onClick={() => {
                            setShowRSVPedMembers((prev) => !prev);
                        }}>
                            <img src="/src/assets/images/user.svg" />
                            <div>{confirmedAttendeeCount} confirmed attendees
                            </div>
                            {(rsvpCount && rsvpCount > 0) ? <>
                                {showRSVPedMembers ? <img src="/src/assets/images/chevron-up.svg" /> : <img src="/src/assets/images/chevron-down.svg" />}
                            </> : <></>
                            }
                        </div>
                    </div>
                </div>
                {
                    <>
                        {!isClubMember && showRSVPedMembers && <div className="rsvpMembersUnauthMessage">User must be a club member to view RSVPed members.</div>}
                        {isClubMember && showRSVPedMembers && <RSVPedMembers meetingId={meeting.meetingId} />}
                        {
                            meeting.description && <div className="meetingDescription mediumText">
                                {meeting.description} meeting in the year 3000 meeting in the year 3000 meeting in the year 300 0meeting in the year 3000me eting in the year 3
                            </div>
                        }
                        {!concluded &&
                            <MeetingRSVPPrompt meetingId={meeting.meetingId} />}
                    </>
                }
        </div >
    );
}

export default Meeting;