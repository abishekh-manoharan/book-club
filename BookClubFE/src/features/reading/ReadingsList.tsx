import React from 'react';
import { useGetReadingsOfAClubQuery } from './readingSlice';
import { Link } from 'react-router-dom';

interface ReadingsListProps {
    clubId: number
}

function ReadingsList(props: ReadingsListProps) {

    const { data: readings } = useGetReadingsOfAClubQuery(props.clubId);

    return (
        <div>
            <h3>readings List</h3>
            {
                readings && readings!.map((r) => <Link to={`reading/${r.bookId}`}>{r.name}<br/></Link>)
            }
        </div>
    );
}

export default ReadingsList;