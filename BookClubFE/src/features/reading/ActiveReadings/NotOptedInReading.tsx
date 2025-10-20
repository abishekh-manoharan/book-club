import { useGetBookQuery } from "../../../features/book/bookSlice";
import { useGetClubQuery, useGetClubUserQuery } from "../../../features/club/clubSlice";
import { useGetReadingMemberCountQuery, useOptIntoReadingMutation } from "../readingSlice";

import { updateErrorMessageThunk } from "../../error/errorSlice";
import { useAppDispatch } from "../../../app/hooks";
import { isFetchBaseQueryError, isSerializedError } from "../../../app/typeGuards";
import { useGetUserIdQuery } from "../../../features/auth/authSlice";

interface NotOptedInReadingProps {
    clubId: number,
    bookId: number
}

function NotOptedInReading({ clubId, bookId }: NotOptedInReadingProps) {
    const dispatch = useAppDispatch();

    const { data: userId } = useGetUserIdQuery();
    const { data: clubUser, isSuccess: isGetClubUserSuccess }
        = useGetClubUserQuery(
            { clubId: clubId, userId: userId as number },
            { skip: !userId }
        );

    const { data: book } = useGetBookQuery(bookId);
    const { data: club } = useGetClubQuery(clubId);
    const { data: readingMemberCount } = useGetReadingMemberCountQuery({ BookId: bookId, ClubId: clubId });

    const [optIntoReading, { isLoading: optIntoReadingLoading }] = useOptIntoReadingMutation();

    const optIntoReadingBtnClickHandler = async () => {
        try {
            const result = await optIntoReading({ bookId, clubId }).unwrap()
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
        <div className="optedInReading activeReadings-reading">
            {book?.cover_Id ?
                <img className="activeReadings-reading-img" src={`https://covers.openlibrary.org/b/ID/${book?.cover_Id}-M.jpg`} />
                : <img className="activeReadings-reading-img activeReadings-reading-img-noimg" src='/src/assets/images/book-open.svg' />
            }
            <div className="activeReadings-reading-bookname">
                {book?.title}
            </div>
            <div className="activeReadings-reading-clubname">
                {club?.name}
            </div>
            <div className="activeReadings-reading-membercount">
                <img className="userLogo user" src='/src/assets/images/user.svg' />
                {readingMemberCount}
            </div>
            {
                isGetClubUserSuccess && clubUser && <div className="activeReadings-reading-OptInBtn">
                    <button onClick={optIntoReadingBtnClickHandler} disabled={optIntoReadingLoading}>Opt in</button>
                </div>
            }
        </div>
    );
}
export default NotOptedInReading;