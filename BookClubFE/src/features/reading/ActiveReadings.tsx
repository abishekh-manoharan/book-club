import { useGetReadingUsersOfLoggedInUsersQuery } from "./readingSlice";

function ActiveReadings() {
    const { data: readingUsersOfLoggedInUser } = useGetReadingUsersOfLoggedInUsersQuery();
    console.log(readingUsersOfLoggedInUser);
    return (
        <div>
            Active Readings
            {readingUsersOfLoggedInUser && readingUsersOfLoggedInUser.map((ru) =>
                <>
                    {ru.bookId}
                </>
            )}
        </div>
    );
}

export default ActiveReadings;