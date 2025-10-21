import React, { useMemo, useRef, useState } from 'react';
import { Reading, useGetReadingsOfAClubQuery, useGetReadingUsersOfLoggedInUsersQuery } from './readingSlice';
import { useParams } from 'react-router-dom';
import OptedInReading from './ActiveReadings/OptedInReading';
import NotOptedInReading from './ActiveReadings/NotOptedInReading';
import { useGetUserIdQuery } from '../auth/authSlice';
import { useGetClubUserQuery } from '../club/clubSlice';

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
    const optedInReadingsRef = useRef<HTMLDivElement | null>(null);
    const notOptedInReadingsRef = useRef<HTMLDivElement | null>(null);

    const [joinedReadingsHidden, setJoinedReadingsHidden] = useState(false);
    const [notJoinedReadingsHidden, setNotJoinedReadingsHidden] = useState(false);

    const { data: userId } = useGetUserIdQuery();
    const { isSuccess: isGetClubUserSuccess, isError: isGetClubUserError }
        = useGetClubUserQuery(
            { clubId: Number(params.clubid), userId: userId as number },
            { skip: !userId }
        );

    // getting all the readings of the club
    const { data: readings } = useGetReadingsOfAClubQuery(Number(params.clubid));
    // getting readings of the club that the user has joined
    const { data: readingUsersOfLoggedInUser } = useGetReadingUsersOfLoggedInUsersQuery(undefined);
    // const { data: readingsOfClubsJoinedByUser, isFetching: isFetchingReadingsOfClubsJoinedByUser } = useGetAllReadingsOfClubsJoinedByUserQuery();

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

    const toggleJoinedReadingsList = () => {
        setJoinedReadingsHidden((state) => !state);
    }
    const toggleNotJoinedReadingsList = () => {
        setNotJoinedReadingsHidden((state) => !state);
    }

    return (
        <div className="readingsList">
            {isGetClubUserSuccess &&
                <>
                    <div className="readingsListHeader" onClick={toggleJoinedReadingsList}>
                        {joinedReadingsHidden ? <img className="readingsListHeader-plus" src='/src/assets/images/plus.svg' /> :
                            <img className="ListHeader-plus" src='/src/assets/images/minus.svg' />}
                        <h2>Joined Readings</h2>
                    </div>
                    <div ref={optedInReadingsRef} className="optedInReadingsDropdown" hidden={joinedReadingsHidden}>
                        {
                            organizedReadings && organizedReadings!.joinedReadings?.map((r) =>
                                <OptedInReading key={r.bookId + r.clubId - 1} bookId={r.bookId} clubId={r.clubId} progress={r.progress!} progressTotal={r.progressTotal} progresstypeId={r.progresstypeId} />
                            )
                        }
                    </div>
                    <div className="readingsListHeader" onClick={toggleNotJoinedReadingsList}>
                        {notJoinedReadingsHidden ? <img className="readingsListHeader-plus" src='/src/assets/images/plus.svg' /> :
                            <img className="ListHeader-plus" src='/src/assets/images/minus.svg' />}
                        <h2>Not Joined Readings</h2>
                    </div>


                    <div ref={notOptedInReadingsRef} className="notOptedInReadingsDropdown" hidden={notJoinedReadingsHidden}>
                        {
                            organizedReadings && organizedReadings!.notJoinedReadings?.map((r) => {
                                if (r.status != 'concluded') {
                                    return <NotOptedInReading key={r.bookId + r.clubId - 1} bookId={r.bookId} clubId={r.clubId} />
                                }
                            }
                            )
                        }
                    </div>
                </>
            }
            { isGetClubUserError && 
                organizedReadings && organizedReadings!.notJoinedReadings?.map((r) => {
                    if (r.status != 'concluded') {
                        return <NotOptedInReading key={r.bookId + r.clubId - 1} bookId={r.bookId} clubId={r.clubId} />
                    }
                })
            }
        </div>
    );
}

export default ReadingsList;