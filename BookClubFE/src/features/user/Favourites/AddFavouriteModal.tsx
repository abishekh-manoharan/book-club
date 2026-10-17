import BookSearch from "../../../features/reading/CreateReading/BookSearch";
import { Book } from "../../../features/reading/readingSliceOpenLibrary";
import { useEffect, useRef, useState } from "react";
import { isFetchBaseQueryError, isSerializedError } from '../../../app/typeGuards';
import { useAppDispatch } from "../../../app/hooks";
import { updateErrorMessageThunk } from "../../../features/error/errorSlice";
import { useAddFavouriteMutation } from "../userSlice";

function AddFavouriteModal({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const modal = useRef<HTMLDivElement>(null);
    const [selectedBook, setSelectedBook] = useState<Book>();
    const dispatch = useAppDispatch();
    const [addFavourite] = useAddFavouriteMutation();

    useEffect(() => {
         // Close the modal if the user clicks outside of it
        const currentModal = modal.current;

        const handler = (e: MouseEvent) => {
            if (e.target === currentModal) {
                setShowModal(false);
            }
        }

        currentModal?.addEventListener("click", handler);

        return () => {
            currentModal?.removeEventListener("click", handler);
        }

    }, [setShowModal]);

    // function used to generate an int value from a string
    const simpleStringToInt = (str: string) => {
        let hash = 0;
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + charCode;  // hash * 31 + charCode
            hash |= 0;  // Convert to 32-bit integer
        }
        return hash;
    }


    const addFavouriteButtonClickHandler = async () => {
        if (!selectedBook) {
            dispatch(updateErrorMessageThunk("no book selected."))
            return;
        }

        const newFavourite = {
            ...selectedBook,
            AuthorName: selectedBook.AuthorName ? selectedBook.AuthorName[0] : undefined, // ensuring author name isn't array when sent to api
            bookId: simpleStringToInt(selectedBook.Ol_key), // generating bookId by transforming the olkey string to an numerical version
            title: selectedBook.Title,
            Ol_key: selectedBook.Ol_key,
        }

        try {
            await addFavourite(newFavourite).unwrap();
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
        <div ref={modal} className="modalBackground modal">
            <div className="addFavouriteModal">
                <div className="selectedBook">
                    {selectedBook === undefined ? <>
                        <img className="selectedBookCover" src="/src/assets/images/book-open.svg" alt="image indicating no books has been selected" />
                        <div className="noBookSelectedLabel"><i>No book selected</i></div>
                    </> : <>{
                        selectedBook.Cover_Id ?
                            <img className="selectedBookCover" src={`https://covers.openlibrary.org/b/ID/${selectedBook?.Cover_Id}-M.jpg`} alt="image indicating no books has been selected" />
                            : <img className="selectedBookCover" src='/src/assets/images/book-open.svg' alt="image indicating no books has been selected" />
                    }
                        <div className="BookSelectedLabel">
                            <div className="bookSearchResultTitle">{selectedBook?.Title}</div>
                            <div className="bookSearchResultAuthorName">{selectedBook.AuthorName}</div>
                        </div>
                    </>
                    }
                </div>
                <BookSearch selectedBook={selectedBook} setSelectedBook={setSelectedBook} />

                <button onClick={addFavouriteButtonClickHandler}>
                    add favourite
                </button>
            </div>
        </div>
    );
}

export default AddFavouriteModal;