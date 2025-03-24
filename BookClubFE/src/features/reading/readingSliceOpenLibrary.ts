import { apiSliceOpenLibrary } from "../api/apiSliceOpenLibrary";

export interface Book {
    BookId: number,
    Cover_Id: number,
    Title: string,
    AuthorName: string[],
    Ol_key: string,
    FirstPublishYear: number,
    NumberOfPagesMedian: number,
    RatingsAverage: number
}

export interface BookSearchResponse {
    author_name: string[],
    cover_i: number,
    first_publish_year: number,
    key: string,
    number_of_pages_median: number,
    ratings_average: number,
    title: string,
}

export const apiSliceWithReading = apiSliceOpenLibrary.injectEndpoints({
    endpoints: (builder) => ({
        search: builder.query<BookSearchResponse[], { query: string } >({
            query: (newReading) => ({
                url: `${newReading.query}&fields=title,author_name,first_publish_year,number_of_pages_median,ratings_average,cover_i,key&page=1&limit=10`,
                credentials: "omit",
                method: 'GET',
            }),
            transformResponse(res: { docs: BookSearchResponse[] }) {
                return res.docs;
            }
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
    useSearchQuery,
    // useGetClubQuery,
} = apiSliceWithReading