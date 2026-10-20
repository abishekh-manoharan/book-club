import React from 'react';
import { useRemoveFavouriteMutation } from './userSlice';
import { isFetchBaseQueryError, isSerializedError } from '../../app/typeGuards';
import { useAppDispatch } from "../../app/hooks";
import { updateErrorMessageThunk } from "../../features/error/errorSlice";
interface BookInterface {
    authorName: string;
    bookId: number;
    cover_Id: number;
    dateAdded: string;
    firstPublishYear: number;
    numberOfPagesMedian: number;
    ol_key: string;
    ratingsAverage: number;
    title: string;
    userId: number;
}

function Book({ book, profileIsUserAgents }: { book: BookInterface, profileIsUserAgents: boolean }) {
    const [removeFavourite] = useRemoveFavouriteMutation();
    const dispatch = useAppDispatch();

    const removeBookBtnClickHandler = async () => {
        try {
            await removeFavourite(book.bookId).unwrap();
        } catch (error) {
            if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else if (isFetchBaseQueryError(error)) {
                const errormsg = error.data as string;
                if (errormsg === "No club users found with the associated clubid.") return;
                dispatch(updateErrorMessageThunk(errormsg));
            }
        }
    }

    return (
        <div className="favBook">
            {book.cover_Id ?
                <img className="selectedBookCover" src={`https://covers.openlibrary.org/b/ID/${book.cover_Id}-M.jpg`} alt="image indicating no books has been selected" />
                : <img className="selectedBookCover" src='/src/assets/images/book-open.svg' alt="image indicating no books has been selected" />
            }
            {profileIsUserAgents &&
                <div className="removeBookBtn" onClick={removeBookBtnClickHandler}>
                    <img src="/src/assets/images/x-white.svg" />
                </div>
            }
        </div>
    );
}

export default Book;