import React, { useEffect, useState } from 'react';
import { Book, useSearchQuery } from '../readingSliceOpenLibrary';
import BookSearchResult from './BookSearchResult';

interface BookSearchProps {
    selectedBook: Book | undefined,
    setSelectedBook: React.Dispatch<React.SetStateAction<Book | undefined>>
}

function BookSearch(props: BookSearchProps) {
    const [searchValue, setSearchValue] = useState('');
    const [searchValuePrepared, setSearchValuePrepared] = useState('');
    const { data } = useSearchQuery({ query: searchValuePrepared })
    const [searchResults, setSearchResults] = useState([<></>]);
    const [hideSearchResults, setHideSearchResults] = useState(false);


    useEffect(() => {
        console.log(data)
        if (data && data?.length > 0) {
            const results = data.map(result => {
                return <BookSearchResult result={result} setSelectedBook={props.setSelectedBook} />
            })
            setSearchResults(results);
            setHideSearchResults(false);
            return;
        }
        setHideSearchResults(true);
    }, [searchValue, data])

    const setSearchValuePrep = (value: string) => {
        const searchValuePrepared = value.replaceAll(" ", "_");
        setSearchValue(value);
        setSearchValuePrepared(searchValuePrepared);
    }

    const onSearchInputBlur = () => {
        setTimeout(() => setHideSearchResults(true), 200);
    }
    const onSearchInputFocus = () => {
        setHideSearchResults(false);
    }

    return (
        <div>
            <label htmlFor="book">Book*</label>
            <input name="book" className="textInput" type='text' value={searchValue} onFocus={onSearchInputFocus} onBlur={onSearchInputBlur} onChange={(e) => setSearchValuePrep(e.target.value)} /> <br />
            <div className="bookSearchResults" hidden={hideSearchResults} style={{ "backgroundColor": "black"}}>
                {searchResults}
            </div>
        </div>
    );
}

export default BookSearch;