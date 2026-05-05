import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetOneReadingQuery, useGetReadingUserQuery, useOptIntoReadingMutation, useOptOutOfReadingMutation } from "../readingSlice";
import { useGetUserIdQuery } from "../../auth/authSlice";
import { useAppDispatch } from "../../../app/hooks";
import { updateErrorMessageThunk } from "../../error/errorSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../../app/typeGuards";
// import UpdateReadingProgress from "./UpdateReadingProgress";
import { useGetClubQuery, useGetClubUserQuery } from "../../club/clubSlice";
import CreateMeeting from "../../meeting/CreateMeeting";
import MeetingList from "../../meeting/MeetingList";
import DiscussionBoard from "../../discussion/DiscussionBoard";
import { useGetBookQuery } from "../../book/bookSlice";
import Progress from "../ActiveReadings/Progress";
import NavBar from "../NavBar";


function ReadingHome({ status }: { status: boolean | undefined }) {
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: club, isSuccess: isGetClubSuccess }
        = useGetClubQuery(clubId);
    // if the user isn't logged in, re
    
    if (!status && club && isGetClubSuccess && club.private) {
        nav(`/club/${clubId}`)
    }

    const { data: book } = useGetBookQuery(bookId);
    const { data: userId, isSuccess: getUserIsSuccess, isFetching: getUserIsFetching } = useGetUserIdQuery();
    const { data: reading, isSuccess: getReadingIsSuccess, isFetching: getReadingIsFetching } = useGetOneReadingQuery(
        { ClubId: clubId, BookId: bookId },
        { skip: !bookId || !clubId || isNaN(clubId) || isNaN(bookId) }
    );
    const { data: readingUser, isSuccess: getReadingUserSuccess, isError: getReadingUserError, isFetching: getReadingUserIsFetching } = useGetReadingUserQuery(
        { BookId: bookId, ClubId: clubId, UserId: userId! },
        { skip: !getUserIsSuccess || !userId || !clubId || isNaN(clubId) || !bookId || isNaN(bookId) || !getReadingIsSuccess }
    );
    const { data: clubUser, isSuccess: clubUserIsSuccess, isFetching: clubUserIsFetching } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !getUserIsSuccess || !userId || !clubId || isNaN(clubId) }
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
    const isClubMember: boolean = clubUserIsSuccess;
    const isAdmin = clubUserIsSuccess && clubUser && clubUser.admin;
    const loggedIn = getUserIsSuccess;

    return (
        <div className="readingHome">
            {book?.cover_Id ?
                <img className="selectedBookCover" src={`https://covers.openlibrary.org/b/ID/${book?.cover_Id}-M.jpg`} /> :
                <img className="selectedBookCover" src='/src/assets/images/book-open.svg' />
            }
            <h1>{book?.title}</h1>
            {book?.authorName && <p className='bookSearchResultAuthorName'>{book?.authorName}</p>}

            {optedIn && isClubMember && <button onClick={optOutOfReadingButtonClick} className="optBtn">Opt Out</button>}
            {optedOut && isClubMember && <button onClick={optIntoReadingButtonClick} className="optBtn">Opt In</button>}

            {!getUserIsFetching && !getReadingIsFetching && !getReadingUserIsFetching && <>
                {optedIn &&
                    <Progress bookId={bookId} clubId={clubId} progress={readingUser!.progress} progresstypeId={readingUser!.progresstypeId} progressTotal={readingUser!.progressTotal} />
                }
                <NavBar />
                <Outlet />
            </>}
        </div>
    );
}

export default ReadingHome;
