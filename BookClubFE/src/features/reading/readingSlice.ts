import { apiSlice } from "../api/apiSlice";

export interface Reading {
    bookId: number,
    clubId: number,
    name: string,
    description?: string,
    status: string,
    startDate: Date
}

export interface NewReading {
    BookId: number,
    ClubId: number,
    Name: string,
    Description?: string,
    Cover_Id?: number,
    Title: string,
    AuthorName?: string,
    Ol_key?: string,
    FirstPublishYear?: number,
    NumberOfPagesMedian?: number,
    RatingsAverage?: number
}

// export interface ReadingUser {
//     UserId: number,
//     BookId: number,
//     ClubId: number,
//     Progress: number,
//     ProgresstypeId: number,
// }
export interface ReadingUser {
    userId: number,
    bookId: number,
    clubId: number,
    progress: number,
    progressTotal?: number | undefined,
    progresstypeId: number,
}

export interface ReadingUserExpanded {
    userId: number,
    bookId: number,
    clubId: number,
    progress: number,
    progressTotal?: number | undefined,
    progresstypeId: number,
    fName: string,
    lName: string,
    profileImg: string,
    aspnetuserId: string
}

export type ReadingWithoutUserAndProgress = Pick<ReadingUser, "bookId" | "clubId">

export const apiSliceWithReading = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createReading: builder.mutation<Reading, NewReading>({
            query: (newReading) => ({
                url: 'reading/create',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(newReading),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{type: 'Readings', id: 'all'}]
        }),
        getOneReading: builder.query<Reading, {ClubId: number, BookId: number}>({
            query: (reading) => ({
                url: `reading/GetAReading?ClubId=${reading.ClubId}&BookId=${reading.BookId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: [{type: 'Readings', id: 'all'}]
        }),
        getReadingMemberCount: builder.query<number, {ClubId: number, BookId: number}>({
            query: (reading) => ({
                url: `reading/ReadingMemberCount?ClubId=${reading.ClubId}&BookId=${reading.BookId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            // transformResponse(res: {$id: string, $values: Reading}){
            //     return res.$values;
            // },
            providesTags: [{type: 'Readings', id: 'all'}]
        }),
        getReadingMembers: builder.query<ReadingUserExpanded[], {ClubId: number, BookId: number}>({
            query: (reading) => ({
                url: `reading/readingMembers?ClubId=${reading.ClubId}&BookId=${reading.BookId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: {$id: string, $values: ReadingUserExpanded[]}){
                return res.$values;
            },
            providesTags: [{type: 'Readings', id: 'all'}]
        }),
        getReadingsOfAClub: builder.query<Reading[], number>({
            query: (clubId) => ({
                url: `reading/GetAllReadings?clubId=${clubId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: {$id: string, $values: Reading[]}){
                return res.$values;
            },
            providesTags: [{type: 'Readings', id: 'all'}]
        }),
        getReadingUsersOfLoggedInUsers: builder.query<ReadingUser[], void>({
            query: () => ({
                url: `reading/readingUsersOfLoggedInUser`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: {$id: string, $values: ReadingUser[]}){
                return res.$values;
            },
            providesTags: [{type: 'Readings', id: 'all'}]
        }),
        getAllReadingsOfClubsJoinedByUser: builder.query<Reading[], void>({
            query: () => ({
                url: `reading/GetAllReadingsOfClubsJoinedByUser`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: {$id: string, $values: Reading[]}){
                return res.$values;
            },
            providesTags: [{type: 'Readings', id: 'all'}]
        }),
        getReadingUser: builder.query<ReadingUser, {UserId: number, BookId: number, ClubId: number}>({
            query: (readingUser) => ({
                url: `reading/readingUser?clubId=${readingUser.ClubId}&bookId=${readingUser.BookId}&userId=${readingUser.UserId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: [{type: 'Readings', id: 'user'}]
        }),
        optIntoReading: builder.mutation<Reading, ReadingWithoutUserAndProgress>({
            query: (reading) => ({
                url: 'reading/OptIntoReading',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(reading),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{type: 'Readings'}]
        }),
        optOutOfReading: builder.mutation<Reading, ReadingWithoutUserAndProgress>({
            query: (reading) => ({
                url: 'reading/OptOutOfReading',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(reading),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{type: 'Readings'}]
        }),
        updateReadingProgress: builder.mutation<Reading, Omit<ReadingUser, "userId">>({
            query: (reading) => ({
                url: 'reading/UpdateReadingProgress',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(reading),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{type: 'Readings', id: 'all'}]
        }),
        // getClub: builder.query<Club, number>({
        //     query: (clubId) => ({
        //         url: `club/getOneClub?clubId=${clubId}`,
        //         credentials: 'include',
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        // }),
    })
})

export const {
    useCreateReadingMutation,
    useGetReadingsOfAClubQuery,
    useGetReadingUserQuery,
    useGetReadingUsersOfLoggedInUsersQuery,
    useGetOneReadingQuery,
    useGetReadingMemberCountQuery,
    useGetReadingMembersQuery,
    useOptIntoReadingMutation,
    useOptOutOfReadingMutation,
    useUpdateReadingProgressMutation,
    useGetAllReadingsOfClubsJoinedByUserQuery,
} = apiSliceWithReading