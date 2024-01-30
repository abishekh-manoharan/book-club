import { useEffect, useState } from "react";
import { bookSearch } from "../services/bookService";
// import data from '../../data';
import { Book } from '../types';

export function BookBrowse() {
  const [searchInput, setSearchInput] = useState('') // search input
  const [page, setPage] = useState(1); // page number
  const [limit, setLimit] = useState(5); // number of results per page
  const [books, setBooks] = useState([]); // displayed books

  useEffect(() => {
    // 
    // calling the open book API whenever search input, page number, or limit changes
    // to update the books list
    //
    bookSearch(searchInput, page, limit)
      .then((res) => {
        console.log(res);
        setBooks(res.docs)
      }
      );
  }, [searchInput, page, limit]);

  return (
    <div>
      {
        books.map((book: Book) => {
          return <div className="book-result">
            {
              book ? <>
                <div className="result-field">{book.title} </div>
                <div className="result-field">{book.author_name}</div>
                <div className="result-field">{book.first_publish_year}</div>
                <div className="result-field">{book.number_of_pages_median}</div>
                <div className="result-field">{book.ratings_average}</div>
              </>
                : <></>
            }
          </div>
        })
      }
      <input type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} placeholder="Search by Author, Title, or ISBN" />
    </div>
  );
}
