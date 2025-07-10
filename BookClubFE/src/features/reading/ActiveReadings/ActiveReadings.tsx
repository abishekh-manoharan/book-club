import { useMemo } from "react";
import { Reading, useGetAllReadingsOfClubsJoinedByUserQuery, useGetReadingUsersOfLoggedInUsersQuery } from "../readingSlice";
import OptedInReading from "./OptedInReading";
import NotOptedInReading from "./NotOptedInReading";

function ActiveReadings() {
    const { data: readingsOfClubsJoinedByUser, isFetching: isFetchingReadingsOfClubsJoinedByUser } = useGetAllReadingsOfClubsJoinedByUserQuery();
    const { data: readingUsersOfLoggedInUser, isFetching: isFetchingReadingUsersOfLoggedInUser, isSuccess } = useGetReadingUsersOfLoggedInUsersQuery(undefined, { skip: !readingsOfClubsJoinedByUser });

    interface ReadingWithProgress extends Reading {
        progress?: number,
        progressTotal?: number,
        progresstypeId?: number
    }

    interface OrganizedReadings {
        joinedReadings: ReadingWithProgress[],
        notJoinedReadings: Reading[]
    }

    const organizedReadings: OrganizedReadings | undefined = useMemo(() => {
        if (readingsOfClubsJoinedByUser && readingUsersOfLoggedInUser) {
            const organizedReadings: OrganizedReadings = { joinedReadings: [], notJoinedReadings: [] };

            const idsOfJoinedReadings = readingUsersOfLoggedInUser.map((ru) => { return { clubId: ru.clubId, bookId: ru.bookId } })
            console.log("idsOfJoinedReadings")
            console.log(idsOfJoinedReadings[0].bookId)
            console.log(...readingsOfClubsJoinedByUser)
            readingsOfClubsJoinedByUser.forEach(reading => {
                if (idsOfJoinedReadings.some((id) => id.bookId === reading.bookId && id.clubId === reading.clubId)) {
                    const readingUser = readingUsersOfLoggedInUser.find((readingUser => readingUser.bookId === reading.bookId && readingUser.clubId === reading.clubId))
                    organizedReadings.joinedReadings.push({...reading, progress: readingUser?.progress, progressTotal: readingUser?.progressTotal, progresstypeId: readingUser?.progresstypeId});
                } else {
                    organizedReadings.notJoinedReadings.push(reading);
                }
            });

            return organizedReadings;
        }
        else {
            return { joinedReadings: [], notJoinedReadings: [] }
        }
    }, [readingsOfClubsJoinedByUser, readingUsersOfLoggedInUser]);

    return (
        <div>
            {isFetchingReadingUsersOfLoggedInUser || isFetchingReadingsOfClubsJoinedByUser && <>loading</>}
            {organizedReadings && isSuccess &&
                <>
                    Active Readings
                    {
                        organizedReadings.joinedReadings.map((reading) => {
                            console.log("reading-");
                            console.log(reading.progressTotal);
                            return <OptedInReading key={reading.bookId+reading.clubId-1} bookId={reading.bookId} clubId={reading.clubId} progress={reading.progress} progressTotal={reading.progressTotal} progresstypeId={reading.progresstypeId}/>;
                        })
                    } <br/> <br/>

                    Not Active Readings
                    {
                        organizedReadings.notJoinedReadings.map((reading) => {
                            return <NotOptedInReading key={reading.bookId+reading.clubId-2} bookId={reading.bookId} clubId={reading.clubId}/>;
                        })
                    }
                </>
            }
        </div>
    );
}

export default ActiveReadings;