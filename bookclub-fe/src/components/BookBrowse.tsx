import { useEffect, useState } from "react";
import { bookSearch } from "../services/bookService";
// import data from '../../data';
import { Book } from '../types';

export function BookBrowse() {
  const [searchInput, setSearchInput] = useState('') // search input
  const [page, setPage] = useState(1); // page number
  const [totalPages, setTotalPages] = useState(1); // total pages for query
  const [limit] = useState(5); // number of results per page
  const [books, setBooks] = useState<Book[]>([]); // displayed books

  // effect that updates the books whenever the page number of page limit changes
  useEffect(() => {
    bookSearch(searchInput, page, limit)
      .then((res) => {
        setBooks(res.docs)
      }
    );
  }, [page, limit]);

  // effect that updates the books whenever the search query changes
  useEffect(() => {
    setPage(1); // page is set back to one for new queries

    bookSearch(searchInput, 1, limit)
      .then((res) => {
        setBooks(res.docs);
        setTotalPages(Math.ceil(res.num_found / limit));
      }
      );
  }, [searchInput]);

  const pageUpdateHandler = (button: string) => {
    if (button === '+') { // if the user presses the next page button
      setPage(page + 1);
    }
    else if (button === '-' && page > 1) { // ensure that the user cannot go to page 0
      setPage(page - 1);
    }

  }

  return (
    <div>
      <input type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} placeholder="Search by Author, Title, or ISBN" />
      { books.length > 0 ?
          books.map((book: Book) => {
            return <div className="book-result">
              <div className="result-field">{book.title} </div>
              <div className="result-field">{book.author_name}</div>
              <div className="result-field">{book.first_publish_year}</div>
              <div className="result-field">{book.number_of_pages_median}</div>
              <div className="result-field">{book.ratings_average}</div>
            </div> 
          }) : <p>Search for somthing</p> 
        }
      
      <p>page {books.length === 0 ? 0 : page} of {totalPages}</p>

      <button onClick={() => pageUpdateHandler('+')}> + </button>
      <button onClick={() => pageUpdateHandler('-')}> - </button>
    </div>
  );
}
