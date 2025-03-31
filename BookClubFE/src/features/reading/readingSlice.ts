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

export interface ReadingUser {
    UserId: string,
    BookId: string,
    ClubId: string,
    Progress: string,
    ProgresstypeId: string,
}

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
            }
        }),
        getReadingUser: builder.query<ReadingUser, {UserId: number, BookId: number, ClubId: number}>({
            query: (readingUser) => ({
                url: `reading/GetAllReadings?clubId=${readingUser.ClubId}&bookId=${readingUser.BookId}&userIf=${readingUser.UserId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: {$id: string, $values: ReadingUser}){
                return res.$values;
            }
        })
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
    useGetReadingsOfAClubQuery
} = apiSliceWithReading