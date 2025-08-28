import React from 'react';
import { useGetReadingsOfAClubQuery } from './readingSlice';
import { Link, useParams } from 'react-router-dom';

// interface ReadingsListProps {
//     clubId: number
// }

function ReadingsList() {
    const params = useParams();
    const { data: readings } = useGetReadingsOfAClubQuery(Number(params.clubId));


    return (
        <div className="readingsList">
            <h3>readings List</h3>
            {
                readings && readings!.map((r) => <Link to={`reading/${r.bookId}`}>{r.name}<br/></Link>)
            }
        </div>
    );
}

export default ReadingsList;