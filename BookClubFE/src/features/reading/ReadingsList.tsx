import React, { useMemo } from 'react';
import { Reading, useGetAllReadingsOfClubsJoinedByUserQuery, useGetReadingsOfAClubQuery, useGetReadingUsersOfLoggedInUsersQuery } from './readingSlice';
import { Link, useParams } from 'react-router-dom';
import OptedInReading from './ActiveReadings/OptedInReading';

interface ReadingsListOrganizedReadings {
    joinedReadings: ReadingWithProgress[] | undefined;
    notJoinedReadings: Reading[] | undefined;
    concludedReadings: Reading[] | undefined;
}

interface ReadingWithProgress extends Reading {
    progress?: number,
    progressTotal?: number,
    progresstypeId?: number
}

function ReadingsList() {
    const params = useParams();
    // getting all the readings of the club
    const { data: readings } = useGetReadingsOfAClubQuery(Number(params.clubid));
    // getting readings of the club that the user has joined
    const { data: readingUsersOfLoggedInUser, isFetching: isFetchingReadingUsersOfLoggedInUser, isSuccess } = useGetReadingUsersOfLoggedInUsersQuery(undefined);
    const { data: readingsOfClubsJoinedByUser, isFetching: isFetchingReadingsOfClubsJoinedByUser } = useGetAllReadingsOfClubsJoinedByUserQuery();

    const organizedReadings = useMemo(() => {
        const organizedReadings: ReadingsListOrganizedReadings = { joinedReadings: [], notJoinedReadings: [], concludedReadings: [] };
        const readingsUsersOfClubJoinedByUser = readingUsersOfLoggedInUser?.filter(r => r.clubId === Number(params.clubid));
        // const readingsUsersOfClubJoinedByUserInForm = readingsUsersOfClubJoinedByUser?.map(r => ({bookId: r.bookId, clubId: r.clubId}))

        readings?.forEach((r) => {
            if (readingsUsersOfClubJoinedByUser?.some(ru => ru.bookId === r.bookId && ru.clubId === ru.clubId)) {
                const readingUser = readingUsersOfLoggedInUser?.find((readingUser => readingUser.bookId === r.bookId && readingUser.clubId === r.clubId))
                organizedReadings.joinedReadings?.push({ ...r, progress: readingUser?.progress, progressTotal: readingUser?.progressTotal, progresstypeId: readingUser?.progresstypeId });
            } else if (!readingsUsersOfClubJoinedByUser?.some(ru => ru.bookId === r.bookId && ru.clubId === ru.clubId)) {
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
                organizedReadings && organizedReadings!.joinedReadings?.map((r) =>
                    <OptedInReading key={r.bookId + r.clubId - 1} bookId={r.bookId} clubId={r.clubId} progress={r.progress!} progressTotal={r.progressTotal} progresstypeId={r.progresstypeId} />
                    // <Link key={r.bookId + "" + r.clubId + "" + i} to={`reading/${r.bookId}`}>{r.name}<br /></Link>
                )
            }
        </div>
    );
}

export default ReadingsList;