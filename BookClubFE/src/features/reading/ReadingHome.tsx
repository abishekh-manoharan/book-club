import { useParams } from "react-router-dom";
import { ReadingUser, Reading, useGetOneReadingQuery, useGetReadingUserQuery } from "./readingSlice";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useState } from "react";

interface ReadingHomeProps {

}

function ReadingHome(props) {
    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: userId } = useGetUserIdQuery();
    const { data: reading } = useGetOneReadingQuery(
        {ClubId: clubId, BookId: bookId},
        { skip: !bookId || !clubId || isNaN(clubId) || isNaN(bookId) }
    );
    const { data: readingUser } = useGetReadingUserQuery(
        { BookId: bookId, ClubId: clubId, UserId: userId! },
        { skip: !userId || !clubId || isNaN(clubId) || !bookId || isNaN(bookId) || !reading}
    );

    if (isNaN(clubId) || isNaN(bookId) || !reading) {
        return <div>reading not found.</div>;
    }

    console.log(reading);

    return (
        <div>
            <h1>Reading home</h1>

            clubid <br/>
            {clubid} <br/> <br/>
            bookId <br/>
            {bookId}
        </div>
    );
}

export default ReadingHome;