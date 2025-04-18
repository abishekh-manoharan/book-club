import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "../../app/store";

interface NewThread {
    bookId: number,
    clubId: number,
    text: string
}

export interface NewThreadReply {
    parentthreadid: number,
    bookId: number,
    clubId: number,
    text: string
}

interface Thread {
    parentThreadId: number,
    threadId: number,
    bookId: number,
    clubId: number,
    userId: number,
    text: string,
    timePosted: Date,
    deleted: boolean,
}

export interface NestedThread extends Thread {
    replies: NestedThread[]
}

const threadsAdapter = createEntityAdapter<Thread, number>({
    selectId: (thread) => thread.threadId
});
const initialState = threadsAdapter.getInitialState();


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
            invalidatesTags: [{ type: 'Threads', id: 'all' }]
        }),
        replyToThread: builder.mutation<Thread, NewThreadReply>({
            query: (newThread) => ({
                url: 'discussion/reply',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(newThread),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{ type: 'Threads', id: 'all' }]
        }),
        getThreads: builder.query<EntityState<Thread, number>, { ClubId: number, BookId: number }>({
            query: (reading) => ({
                url: `discussion/getAllThreadsOfAReading?ClubId=${reading.ClubId}&BookId=${reading.BookId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: { $id: string, $values: Thread[] }) {
                return threadsAdapter.setAll(initialState, res.$values);
            },
            providesTags: [{ type: 'Threads', id: 'all' }],
            // keepUnusedDataFor: 60
        }),
        deleteThread: builder.mutation<Thread, number>({
            query: (threadId) => ({
                url: 'discussion/delete',
                credentials: 'include',
                method: 'DELETE',
                body: JSON.stringify(threadId),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{ type: 'Threads', id: 'all' }]
        }),
    })
})



export const selectThreadsResult = (reading: { ClubId: number, BookId: number }) =>
    apiSliceWithDiscussions.endpoints.getThreads.select(reading)
export const selectThreadsData = (reading: { ClubId: number, BookId: number }) => createSelector(
    selectThreadsResult(reading),
    (result) => {
        return result.data ?? initialState;
    }
)


export const makeThreadSelectors = (reading: { ClubId: number, BookId: number }) => {
    return threadsAdapter.getSelectors<RootState>(selectThreadsData(reading))
}

export const makeSelectNestedThreads = (reading: { ClubId: number, BookId: number }) => createSelector(
    makeThreadSelectors(reading).selectAll,
    (threads): NestedThread[] => {
        const threadMap: Record<string, NestedThread> = {}
        const rootThreads: NestedThread[] = []

        for (const thread of threads) {
            threadMap[thread.threadId] = { ...thread, replies: [] }
        }

        for (const thread of threads) {
            const parentId = thread.parentThreadId
            if (parentId && threadMap[parentId]) {
                threadMap[parentId].replies.push(threadMap[thread.threadId])
            } else {
                rootThreads.push(threadMap[thread.threadId])
            }
        }

        return rootThreads
    }
)


export const {
    useCreateThreadMutation,
    useReplyToThreadMutation,
    useGetThreadsQuery,
    useDeleteThreadMutation
} = apiSliceWithDiscussions
