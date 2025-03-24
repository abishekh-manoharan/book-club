import React, { useState } from 'react';
import BookSearch from './BookSearch';
import { Book } from '../readingSliceOpenLibrary';

function CreateReading() {
    const [selectedBook, setSelectedBook] = useState<Book>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
            <form>
                <label htmlFor="name">Name</label>
                <input name="name" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/> <br/>
                <label htmlFor="description">Description</label>
                <input name="description" type="text" value={description} onChange={(e) => {setDescription(e.target.value)}}/> 

                <BookSearch selectedBook={selectedBook} setSelectedBook={setSelectedBook}/>
                {selectedBook?.Title}
            </form>
        </div>
    );
}

export default CreateReading;