import { useMemo } from "react";
import { Reading, useGetAllReadingsOfClubsJoinedByUserQuery, useGetReadingUsersOfLoggedInUsersQuery } from "./readingSlice";

function ActiveReadings() {
    const { data: readingsOfClubsJoinedByUser } = useGetAllReadingsOfClubsJoinedByUserQuery();
    const { data: readingUsersOfLoggedInUser } = useGetReadingUsersOfLoggedInUsersQuery(undefined, { skip: !readingsOfClubsJoinedByUser});

    interface OrganizedReadings {
        joinedReadings: Reading[],
        notJoinedReadings: Reading[]
    }

    const organizedReadings: OrganizedReadings = useMemo(()=>{
        if(readingsOfClubsJoinedByUser && readingUsersOfLoggedInUser){
            const organizedReadings: OrganizedReadings = {joinedReadings: [], notJoinedReadings: []};

            const idsOfJoinedReadings = readingUsersOfLoggedInUser.map((ru) => {return {clubId: ru.clubId, bookId: ru.bookId}})
            readingsOfClubsJoinedByUser.forEach(reading => {
                if(idsOfJoinedReadings.some((id) => id.bookId == reading.bookId && id.clubId == reading.clubId)){
                    organizedReadings.joinedReadings.push(reading);
                } else {
                    organizedReadings.notJoinedReadings.push(reading);
                }
            });

            return organizedReadings;
        }
        else {
            return {joinedReadings: [], notJoinedReadings: []}
        }
    }, [readingsOfClubsJoinedByUser, readingUsersOfLoggedInUser]);

    console.log(organizedReadings);

    return (
        <div>
            Active Readings
            {readingUsersOfLoggedInUser && readingUsersOfLoggedInUser.map((ru) =>
                <>
                    {ru.bookId}
                </>
            )}

            Not Active Readings
        </div>
    );
}

export default ActiveReadings;