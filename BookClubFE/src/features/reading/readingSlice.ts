import { apiSlice } from "../api/apiSlice";

export interface Reading {
    BookId: number,
    ClubId: number,
    Name: string,
    Description?: string,
    Status: string,
    StartDate: Date
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
    // useGetClubQuery,
} = apiSliceWithReading