import { apiSlice } from "../api/apiSlice";

interface NewThread {
    bookId: number,
    clubId: number,
    text: string
}

interface Thread {
    parentThreadId: number,
    bookId: number,
    clubId: number,
    userId: number,
    text: string,
    timePosted: Date,
    deleted: boolean,
}

export const apiSliceWithDiscussions = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createThread: builder.mutation<Thread, NewThread>({
            query: (newThread) => ({
                url: 'discussion/create',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(newThread),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            // invalidatesTags: [{ type: 'Readings', id: 'all' }]
        }),
        // getThreads: builder.query<Reading, {ClubId: number, BookId: number}>({
        //     query: (reading) => ({
        //         url: `reading/GetAReading?ClubId=${reading.ClubId}&BookId=${reading.BookId}`,
        //         credentials: 'include',
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }),
        //     // transformResponse(res: {$id: string, $values: Reading}){
        //     //     return res.$values;
        //     // },
        //     providesTags: [{type: 'Readings', id: 'all'}]
        // }),

    })
})

export const {
    useCreateThreadMutation
} = apiSliceWithDiscussions
