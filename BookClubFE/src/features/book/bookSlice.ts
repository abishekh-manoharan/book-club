import { apiSlice } from "../api/apiSlice";

export interface Book {
    bookId: number,
    cover_Id?: number,
    title: string,
    authorName?: string,
    ol_key: number,
    firstPublishYear?: number,
    numberOfPagesMedian?: number,
    ratingsAverage?: number,
}

export const apiSliceWithBook = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBook: builder.query<Book, number>({
            query: (bookId) => ({
                url: `book/getOneBook?BookId=${bookId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
    })
})

export const {
    useGetBookQuery
} = apiSliceWithBook
