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
    timePosted: Date | string,
    deleted: boolean,
}

export interface NestedThread extends Thread {
    replies: NestedThread[]
}

export interface ThreadCursor {
    BookId: number,
    ClubId: number,
    CursorThreadId: number,
    CursorTimeAgo: string | Date,
    ParentThreadId?: number | null | ""
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
        // getThreads: builder.query<EntityState<Thread, number>, { ClubId: number, BookId: number }>({
        //     query: (reading) => ({
        //         url: `discussion/getAllThreadsOfAReading?ClubId=${reading.ClubId}&BookId=${reading.BookId}`,
        //         credentials: 'include',
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }),
        //     transformResponse(res: { $id: string, $values: Thread[] }) {
        //         return threadsAdapter.setAll(initialState, res.$values);
        //     },
        //     providesTags: [{ type: 'Threads', id: 'all' }],
        //     // keepUnusedDataFor: 60
        // }),
        getThreadsBatch: builder.query<EntityState<Thread, number>, ThreadCursor>({
            query: (reading) => ({
                url: `discussion/getThreadBatch?ClubId=${reading.ClubId}&BookId=${reading.BookId}&CursorThreadId=${reading.CursorThreadId}&CursorTimeAgo=${reading.CursorTimeAgo}&ParentThreadId=${reading.ParentThreadId}`,
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
            keepUnusedDataFor: 60
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



export const selectThreadsResult = (reading: ThreadCursor) =>
    apiSliceWithDiscussions.endpoints.getThreadsBatch.select(reading)
export const selectThreadsData = (reading: ThreadCursor) => createSelector(
    selectThreadsResult(reading),
    (result) => {
        return result.data ?? initialState;
    }
)


export const makeThreadSelectors = (reading: ThreadCursor) => {
    return threadsAdapter.getSelectors<RootState>(selectThreadsData(reading))
}

export const makeSelectNestedThreads = (reading: ThreadCursor) => createSelector(
    makeThreadSelectors(reading).selectAll,
    (threads): {rootThreads: NestedThread[], threadMap: Record<string, NestedThread>}=> {
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

        return {rootThreads, threadMap}
    }
)


export const {
    useCreateThreadMutation,
    useReplyToThreadMutation,
    useGetThreadsBatchQuery,
    // useGetThreadsQuery,
    useDeleteThreadMutation
} = apiSliceWithDiscussions
