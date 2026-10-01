import React from 'react';

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

function Book({ book }: { book: BookInterface }) {
    return (
        <div className="favBook">
            {book.cover_Id ?
                <img className="selectedBookCover" src={`https://covers.openlibrary.org/b/ID/${book.cover_Id}-M.jpg`} alt="image indicating no books has been selected" />
                : <img className="selectedBookCover" src='/src/assets/images/book-open.svg' alt="image indicating no books has been selected" />
            }
        </div>
    );
}

export default Book;