import React from 'react';
import { useGetReadingsOfAClubQuery } from './readingSlice';

interface ReadingsListProps {
    clubId: number
}

function ReadingsList(props: ReadingsListProps) {

    const { data: readings } = useGetReadingsOfAClubQuery(props.clubId);

    return (
        <div>
            <h3>readings List</h3>
            {
                readings && readings!.map((r) => <>{r.name}<br/></>)
            }
        </div>
    );
}

export default ReadingsList;