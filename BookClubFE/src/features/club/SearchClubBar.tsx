import { useEffect, useState } from "react";
import ClubService from "../../services/club";
import { Club } from "../../utils/types";
import { Link } from "react-router-dom";

function SearchClubBar() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<Club[]>([]);

    // event handler to close search window if club link is clicked
    const closeSearchResults = () => {
        const searchBarResults = document.querySelector(".clubsearchresults");
        searchBarResults?.classList.add("hidden");
    }

    useEffect(() => {
        //event listener to determine click location to hide/show search results
        document.addEventListener('click', (e) => {
            const searchBar = document.querySelector(".searchBar");
            const searchBarResults = document.querySelector(".clubsearchresults");
            searchBarResults?.classList.remove("hidden");

            console.log(searchBar?.contains(e.target as Node))
            searchBar?.contains(e.target as Node)
                ? searchBarResults?.classList.remove("hidden") // show search bar if clicked element is contained in search bar component
                : searchBarResults?.classList.add("hidden") // hide search bar if clicked element isn't contained in search bar component
        }, true)
    }, []);

    // getting search results when search value is updated
    useEffect(() => {
        ClubService.getSearchResults(searchValue)
            .then(res => {
                setSearchResults(res);
            })
            .catch(res => {
                setSearchResults([res]);
            });
    }, [searchValue])

    const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setSearchValue(e.target.value);

        // show search results if search input is changed
        const searchBarResults = document.querySelector(".clubsearchresults");
        searchBarResults?.classList.remove("hidden");
    }
    return (
        <div className="searchBar">
            <input onChange={searchInputChangeHandler} value={searchValue} />
            <div className="clubsearchresults hidden">
                {
                    searchResults.map((res, i) => 
                        <Link key={`${res.clubId}${i}`} to={`/club/${res.clubId}`} onClick={closeSearchResults}>{res.name} {res.clubId}</Link>)
                }
            </div>
        </div>
    );
}

export default SearchClubBar;