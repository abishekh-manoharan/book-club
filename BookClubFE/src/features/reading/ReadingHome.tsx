import { useParams } from "react-router-dom";
import { useGetOneReadingQuery, useGetReadingUserQuery, useOptIntoReadingMutation, useOptOutOfReadingMutation } from "./readingSlice";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";


function ReadingHome() {
    const dispatch = useAppDispatch();

    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);


    const { data: userId, isSuccess: getUserIsSuccess, isFetching: getUserIsFetching } = useGetUserIdQuery();
    const { data: reading, isSuccess: getReadingIsSuccess, isFetching: getReadingIsFetching} = useGetOneReadingQuery(
        { ClubId: clubId, BookId: bookId },
        { skip: !bookId || !clubId || isNaN(clubId) || isNaN(bookId) }
    );
    const { isSuccess: getReadingUserSuccess, isError: getReadingUserError} = useGetReadingUserQuery(
        { BookId: bookId, ClubId: clubId, UserId: userId! },
        { skip: !getUserIsSuccess || !clubId || isNaN(clubId) || !bookId || isNaN(bookId) || !getReadingIsSuccess }
    );


    const [optIntoReading] = useOptIntoReadingMutation();
    const [optOutOfReading] = useOptOutOfReadingMutation();


    if (isNaN(clubId) || isNaN(bookId) || !reading) {
        return <div>reading not found.</div>;
    }


    const optIntoReadingButtonClick = async () => {
        try {
            await optIntoReading({ BookId: bookId, ClubId: clubId })
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            }
        }
    }

    const optOutOfReadingButtonClick = async () => {
        try {
            await optOutOfReading({ BookId: bookId, ClubId: clubId })
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            }
        }
    }

    return (
        <div>
            <h1>Reading home</h1>

            {!getUserIsFetching && !getReadingIsFetching && getReadingUserSuccess && getUserIsSuccess && <button onClick={optOutOfReadingButtonClick}>opt out of reading</button>}
            {!getUserIsFetching && !getReadingIsFetching && getReadingUserError && getUserIsSuccess && <button onClick={optIntoReadingButtonClick}>opt into reading</button>}
            clubid <br />
            {clubid} <br /> <br />
            bookId <br />
            {bookId}
        </div>
    );
}

export default ReadingHome;