import { useParams } from "react-router-dom";
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

    return (
        <div>
            {meeting.name} {meeting.startTime}
            {!concluded && isAdmin && <button onClick={deleteMeetingBtnClick}>delete</button>}
        </div>
    );
}

export default Meeting;