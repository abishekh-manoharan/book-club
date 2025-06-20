import { useParams } from "react-router-dom";
import { useGetOneReadingQuery, useGetReadingUserQuery, useOptIntoReadingMutation, useOptOutOfReadingMutation } from "./readingSlice";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import UpdateReadingProgress from "./UpdateReadingProgress";
import { useGetClubUserQuery } from "../club/clubSlice";
import CreateMeeting from "../meeting/CreateMeeting";
import MeetingList from "../meeting/MeetingList";
import DiscussionBoard from "../discussion/DiscussionBoard";


function ReadingHome() {
    const dispatch = useAppDispatch();

    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);


    const { data: userId, isSuccess: getUserIsSuccess, isFetching: getUserIsFetching } = useGetUserIdQuery();
    const { data: reading, isSuccess: getReadingIsSuccess, isFetching: getReadingIsFetching } = useGetOneReadingQuery(
        { ClubId: clubId, BookId: bookId },
        { skip: !bookId || !clubId || isNaN(clubId) || isNaN(bookId) }
    );
    const { isSuccess: getReadingUserSuccess, isError: getReadingUserError, isFetching: getReadingUserIsFetching } = useGetReadingUserQuery(
        { BookId: bookId, ClubId: clubId, UserId: userId! },
        { skip: !getUserIsSuccess || !clubId || isNaN(clubId) || !bookId || isNaN(bookId) || !getReadingIsSuccess }
    );
    const { data: clubUser, isSuccess: clubUserIsSuccess, isError: clubUserIsFetching } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );

    const [optIntoReading] = useOptIntoReadingMutation();
    const [optOutOfReading] = useOptOutOfReadingMutation();


    if (isNaN(clubId) || isNaN(bookId) || !reading) {
        return <div>reading not found.</div>;
    }


    const optIntoReadingButtonClick = async () => {
        try {
            await optIntoReading({ bookId: bookId, clubId: clubId }).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                dispatch(updateErrorMessageThunk("An error occured. Please try again later."));
            }
        }
    }
    const optOutOfReadingButtonClick = async () => {
        try {
            await optOutOfReading({ bookId: bookId, clubId: clubId }).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                dispatch(updateErrorMessageThunk("An error occured. Please try again later."));
            }
        }
    }

    const optedIn: boolean = getReadingUserSuccess;
    const optedOut: boolean = getReadingUserError;
    const isAdmin = clubUserIsSuccess && clubUser && clubUser.admin;
    const loggedIn = getUserIsSuccess;

    return (
        <div>
            <h1>Reading home</h1>
            {!getUserIsFetching && !getReadingIsFetching && !getReadingUserIsFetching && !clubUserIsFetching && <>
                {optedIn && loggedIn && <button onClick={optOutOfReadingButtonClick}>opt out of reading</button>}
                {optedOut && loggedIn && <button onClick={optIntoReadingButtonClick}>opt into reading</button>}<br /><br />

                {isAdmin && optedIn && <CreateMeeting />}
                {optedIn && <MeetingList />}
                {optedIn && loggedIn && <UpdateReadingProgress />}
                {optedIn && loggedIn && <DiscussionBoard />}
            </>}
        </div>
    );
}

export default ReadingHome;