import React from 'react';
import { Book, BookSearchResponse } from '../readingSliceOpenLibrary';

interface BookSearchResultProps {
    result: BookSearchResponse,
    setSelectedBook: React.Dispatch<React.SetStateAction<Book | undefined>>
}

function BookSearchResult(props: BookSearchResultProps) {
    const searchResultClickHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const book: Book = {
            BookId: 0, // placeholder
            Cover_Id: props.result.cover_i,
            Title: props.result.title,
            AuthorName: props.result.author_name,
            Ol_key: props.result.key,
            FirstPublishYear: props.result.first_publish_year,
            NumberOfPagesMedian: props.result.number_of_pages_median,
            RatingsAverage: props.result.ratings_average
        }; 
        props.setSelectedBook(book)
    }

    return (
        <div>
            <a href="" onClick={searchResultClickHandler}>{props.result.title}</a>
        </div>
    );
}

export default BookSearchResult;