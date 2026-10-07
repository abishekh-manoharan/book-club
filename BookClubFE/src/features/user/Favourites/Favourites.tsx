import { Book as BookType } from '../../../features/book/bookSlice';

import React from 'react';
import Book from '../Book';
import AddFavourite from './AddFavourite';

function Favourites({favourites, profileIsUserAgents}: {favourites: BookType[] | undefined, profileIsUserAgents: boolean}) {
    return (
        <>
            <h2>User's Favourite Books</h2>
            {(favourites == undefined || favourites.length == 0) && <div><i className="smallText">No Favorites to show</i></div>}
            <div className="favouriteBooks">
                {profileIsUserAgents && <AddFavourite/>}
                {favourites != undefined && favourites.length > 0 && favourites.map((f) => <Book book={f} />) } 
            </div>
        </>
    );
}

export default Favourites;