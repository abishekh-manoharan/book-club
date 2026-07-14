import React, { useEffect, useState } from 'react';
import BookSearch from './CreateReading/BookSearch';
import { Book } from './readingSliceOpenLibrary';
import { NewReading, useCreateReadingMutation, useGetOneReadingQuery, useUpdateReadingMutation } from './readingSlice';
import { updateErrorMessageThunk } from '../error/errorSlice';
import { useAppDispatch } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { isFetchBaseQueryError, isSerializedError } from '../../app/typeGuards';
import { useNotifyClubMembersMutation } from '../../features/notification/notificationSlice';
import { useGetClubQuery } from '../../features/club/clubSlice';
import { useGetBookQuery } from '../book/bookSlice';

function Settings() {
    const { bookid } = useParams();
    const { clubid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const dispatch = useAppDispatch();
    const [selectedBook, setSelectedBook] = useState<Book>();

    const [name] = useState('');
    const [description, setDescription] = useState('');
    const [progressType, setProgressType] = useState<number>(2);

    const { data: reading } = useGetOneReadingQuery({ BookId: bookId, ClubId: clubId });
    // getting reading's default book to prefill book selection section
    const { data: defaultBook } = useGetBookQuery(bookId);

    useEffect(() => {
        if (reading && defaultBook) {
            setDescription(reading.description ?? "");
            setProgressType(reading.progresstypeId);

            const book = {
                BookId: 0, // placeholder
                Cover_Id: defaultBook.cover_Id,
                Title: defaultBook.title,
                AuthorName: defaultBook.authorName,
                Ol_key: defaultBook.ol_key,
                FirstPublishYear: defaultBook.firstPublishYear,
                NumberOfPagesMedian: defaultBook.numberOfPagesMedian,
                RatingsAverage: defaultBook.ratingsAverage
            };

            setSelectedBook(book);
        }   
    }, [reading, defaultBook]);

    const [updateReading] = useUpdateReadingMutation();
    const { data: club } = useGetClubQuery(clubId, { skip: isNaN(clubId) });

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

    const updateReadingClickHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // ensuring name input is filled in
        const form = document.querySelector('.createReadingForm') as HTMLSelectElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // ensure a book is selected
        if (!selectedBook) {
            dispatch(updateErrorMessageThunk("no book selected."))
            return;
        }

        // specify the name of the book club, depending on if a name was provided or not.
        // let nameToSend = "";
        // // case where the name wasn't provided
        // if (name === "") {
        //     const now = new Date();
        //     const monthName = now.toLocaleString('default', { month: 'long' });
        //     const year = now.getFullYear();
        //     nameToSend = `${selectedBook.Title}, ${selectedBook.AuthorName}`
        // } else {
        //     nameToSend = name;
        // }

        const updatedReading: NewReading = {
            ...selectedBook,
            AuthorName: selectedBook.AuthorName ? selectedBook.AuthorName[0] : undefined, // ensuring author name isn't array when sent to api
            BookId: simpleStringToInt(selectedBook.Ol_key), // generating bookId by transforming the olkey string to an numerical version
            Name: name,
            Description: description,
            ClubId: clubId,
            ProgresstypeId: progressType
        }

        try {
            await updateReading(updatedReading).unwrap();
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

    const selectProgressTypeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProgressType(Number(e.target.value));
    }


    return (
        <div className='createReadingPage'>
            <div className="createReadingHeading">
                <h1>Reading Settings</h1> {progressType}
            </div>
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
            <form className='createReadingForm'>
                <BookSearch selectedBook={selectedBook} setSelectedBook={setSelectedBook} defaultSearchValue={defaultBook?.title}/>

                <label htmlFor="description">Description</label>
                <input className="textInput" name="description" type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />

                <br /><button className="createReadingButton" onClick={updateReadingClickHandler}>Update</button>

                <select className="textInput" onChange={selectProgressTypeChangeHandler} id="progressTypes" value={progressType} required>
                    <option value={2}>Chapters (recommended)</option>
                    <option value={3}>Section</option>
                    <option value={1}>Pages (not recommended)</option>
                </select><br />
            </form>
        </div>
    );
}

export default Settings;