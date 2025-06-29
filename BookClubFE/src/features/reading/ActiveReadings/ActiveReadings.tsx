import { useMemo } from "react";
import { Reading, useGetAllReadingsOfClubsJoinedByUserQuery, useGetReadingUsersOfLoggedInUsersQuery } from "../readingSlice";
import OptedInReading from "./OptedInReading";
import NotOptedInReading from "./NotOptedInReading";

function ActiveReadings() {
    const { data: readingsOfClubsJoinedByUser, isFetching: isFetchingReadingsOfClubsJoinedByUser } = useGetAllReadingsOfClubsJoinedByUserQuery();
    const { data: readingUsersOfLoggedInUser, isFetching: isFetchingReadingUsersOfLoggedInUser, isSuccess } = useGetReadingUsersOfLoggedInUsersQuery(undefined, { skip: !readingsOfClubsJoinedByUser });

    interface OrganizedReadings {
        joinedReadings: Reading[],
        notJoinedReadings: Reading[]
    }

    const organizedReadings: OrganizedReadings | undefined = useMemo(() => {
        if (readingsOfClubsJoinedByUser && readingUsersOfLoggedInUser) {
            const organizedReadings: OrganizedReadings = { joinedReadings: [], notJoinedReadings: [] };

            const idsOfJoinedReadings = readingUsersOfLoggedInUser.map((ru) => { return { clubId: ru.clubId, bookId: ru.bookId } })
            readingsOfClubsJoinedByUser.forEach(reading => {
                if (idsOfJoinedReadings.some((id) => id.bookId == reading.bookId && id.clubId == reading.clubId)) {
                    organizedReadings.joinedReadings.push(reading);
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
                            return <OptedInReading key={reading.bookId+reading.clubId-1} bookId={reading.bookId} clubId={reading.clubId}/>;
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