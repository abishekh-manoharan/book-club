import { useEffect, useState } from "react";
import ClubService from "../services/club";
import { Club } from "../utils/types";
import { Link } from "react-router-dom";

function SearchClubBar() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<Club[]>([]);

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
                    searchResults.map((res) => <div key={res.clubId}>
                        <Link to={`/club/${res.clubId}/home`}>{res.name}</Link>
                    </div>)
                }
            </div>
        </div>
    );
}

export default SearchClubBar;