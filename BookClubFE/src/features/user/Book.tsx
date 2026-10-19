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

function Book({ book, profileIsUserAgents }: { book: BookInterface, profileIsUserAgents: boolean }) {
    return (
        <div className="favBook">
            {book.cover_Id ?
                <img className="selectedBookCover" src={`https://covers.openlibrary.org/b/ID/${book.cover_Id}-M.jpg`} alt="image indicating no books has been selected" />
                : <img className="selectedBookCover" src='/src/assets/images/book-open.svg' alt="image indicating no books has been selected" />
            }
            {profileIsUserAgents && 
                <div className="removeBookBtn">
                    <img src="/src/assets/images/x-white.svg" />
                </div>
            }
        </div>
    );
}

export default Book;