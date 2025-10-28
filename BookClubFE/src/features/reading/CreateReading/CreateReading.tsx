import React, { useState } from 'react';
import BookSearch from './BookSearch';
import { Book } from '../readingSliceOpenLibrary';
import { NewReading, useCreateReadingMutation } from '../readingSlice';
import { updateErrorMessageThunk } from '../../error/errorSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { isFetchBaseQueryError, isSerializedError } from '../../../app/typeGuards';
import { useNotifyClubMembersMutation } from '../../../features/notification/notificationSlice';
import { useGetClubQuery } from '../../../features/club/clubSlice';

function CreateReading() {
    const dispatch = useAppDispatch();
    const [selectedBook, setSelectedBook] = useState<Book>();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { clubid } = useParams();
    const clubId = Number(clubid);
    const [createReading] = useCreateReadingMutation();
    const [notifyClubMembers] = useNotifyClubMembersMutation();
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

    const createReadingClickHandler = async (e: React.SyntheticEvent) => {
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

        const newReading: NewReading = {
            ...selectedBook,
            AuthorName: selectedBook.AuthorName ? selectedBook.AuthorName[0] : undefined, // ensuring author name isn't array when sent to api
            BookId: simpleStringToInt(selectedBook.Ol_key), // generating bookId by transforming the olkey string to an numerical version
            Name: name,
            Description: description,
            ClubId: clubId
        }

        try {
            await createReading(newReading).unwrap();
            await notifyClubMembers({
                ClubId: clubId,
                Text: `New reading created in club: ${club?.name}!`
            }).unwrap();
        } catch (error) {
            if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else if (isFetchBaseQueryError(error)) {
                const errormsg = error.data as string;
                dispatch(updateErrorMessageThunk(errormsg));
            }
        }
    }

    return (
        <div className='createReadingPage'>
            <div className="createReadingHeading">
                <h1>Create A Reading</h1>
                <p>Let's get reading</p>
            </div>
            <form className='createReadingForm'>
                <label htmlFor="name">Name</label>
                <input className="textInput" name="name" type="text" value={name} onChange={(e) => { setName(e.target.value) }} required /> <br />
                <label htmlFor="description">Description</label>
                <input className="textInput" name="description" type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />

                <BookSearch selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
                {selectedBook?.Title}
                <br /><button onClick={createReadingClickHandler}>Create</button>
            </form>
        </div>
    );
}

export default CreateReading;