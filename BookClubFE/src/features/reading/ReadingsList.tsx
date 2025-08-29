import React, { useMemo } from 'react';
import { Reading, useGetReadingsOfAClubQuery, useGetReadingUsersOfLoggedInUsersQuery } from './readingSlice';
import { Link, useParams } from 'react-router-dom';

interface ReadingsListOrganizedReadings {
    joinedReadings: Reading[] | undefined;
    notJoinedReadings: Reading[] | undefined;
    concludedReadings: Reading[] | undefined;
}

function ReadingsList() {
    const params = useParams();
    // getting all the readings of the club
    const { data: readings } = useGetReadingsOfAClubQuery(Number(params.clubid));
    // getting readings of the club that the user has joined
    const { data: readingUsersOfLoggedInUser, isFetching: isFetchingReadingUsersOfLoggedInUser, isSuccess } = useGetReadingUsersOfLoggedInUsersQuery(undefined);
    
    const organizedReadings = useMemo(() => {
        const organizedReadings: ReadingsListOrganizedReadings = { joinedReadings: [], notJoinedReadings: [], concludedReadings: []};
        const readingsUsersOfClubJoinedByUser = readingUsersOfLoggedInUser?.filter(r => r.clubId === Number(params.clubid));
        // const readingsUsersOfClubJoinedByUserInForm = readingsUsersOfClubJoinedByUser?.map(r => ({bookId: r.bookId, clubId: r.clubId}))

        readings?.forEach((r) => {
            if(readingsUsersOfClubJoinedByUser?.some(ru => ru.bookId === r.bookId && ru.clubId === ru.clubId)){
                organizedReadings.joinedReadings?.push(r);
            } else if (!readingsUsersOfClubJoinedByUser?.some(ru => ru.bookId === r.bookId && ru.clubId === ru.clubId)){
                organizedReadings.notJoinedReadings?.push(r);
            } else {
                organizedReadings.concludedReadings?.push(r);
            }
        })

        return organizedReadings;      

    }, [readingUsersOfLoggedInUser, readings, params.clubid])

    console.log(organizedReadings);


    return (
        <div className="readingsList">
            <h3>readings List</h3>
            {
                readings && readings!.map((r, i) => <Link key={r.bookId+""+r.clubId+""+i} to={`reading/${r.bookId}`}>{r.name}<br/></Link>)
            }
        </div>
    );
}

export default ReadingsList;