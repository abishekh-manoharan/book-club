import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "../../app/store";

interface NewClubThread {
    bookId: number,
    clubId: number,
    text: string,
    heading?: string,
    pinned: boolean,
    announcement: boolean
}

export interface NewClubThreadReply {
    parentthreadid: number,
    clubId: number,
    text: string
}

interface ClubThread {
    threadId: number,
    parentThreadId: number,
    clubId: number,
    userId: number,
    text: string,
    heading?: string,
    pinned: boolean,
    deleted: boolean,
    announcement: boolean
    timePosted: Date | string,
}

export interface NestedClubThread extends ClubThread {
    replies: NestedClubThread[]
}

export interface ThreadCursor {
    CursorTimeAgo: string | Date,
    CursorThreadId: number,
    ClubId: number,
    ParentThreadId?: number | null | ""
}

const threadsAdapter = createEntityAdapter<ClubThread, number>({
    selectId: (thread) => thread.threadId
});
const initialState = threadsAdapter.getInitialState();


export const apiSliceWithClubDiscussions = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createClubThread: builder.mutation<ClubThread, NewClubThread>({
            query: (newThread) => ({
                url: 'clubThread/create',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(newThread),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{ type: 'ClubThreads', id: 'all' }]
        }),
        replyToClubThread: builder.mutation<ClubThread, NewClubThreadReply>({
            query: (newThread) => ({
                url: 'clubThread/reply',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(newThread),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{ type: 'ClubThreads', id: 'all' }]
        }),
        // getThreads: builder.query<EntityState<Thread, number>, { ClubId: number, BookId: number }>({
        //     query: (reading) => ({
        //         url: `clubThread/getAllThreadsOfAReading?ClubId=${reading.ClubId}&BookId=${reading.BookId}`,
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
        getClubThreadsBatch: builder.query<EntityState<ClubThread, number>, ThreadCursor>({
            query: (cursor) => ({
                url: `clubThread/getThreadBatch?ClubId=${cursor.ClubId}&CursorThreadId=${cursor.CursorThreadId}&CursorTimeAgo=${cursor.CursorTimeAgo}&ParentThreadId=${cursor.ParentThreadId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: { $id: string, $values: ClubThread[] }) {
                return threadsAdapter.setAll(initialState, res.$values);
            },
            providesTags: [{ type: 'ClubThreads', id: 'all' }],
            keepUnusedDataFor: 60
        }),
        deleteClubThread: builder.mutation<ClubThread, number>({
            query: (threadId) => ({
                url: 'clubThread/delete',
                credentials: 'include',
                method: 'DELETE',
                body: JSON.stringify(threadId),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{ type: 'ClubThreads', id: 'all' }]
        }),
    })
})



export const selectThreadsResult = (reading: ThreadCursor) =>
    apiSliceWithClubDiscussions.endpoints.getClubThreadsBatch.select(reading)
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
    (threads): { rootThreads: NestedClubThread[], threadMap: Record<string, NestedClubThread> } => {
        const threadMap: Record<string, NestedClubThread> = {}
        const rootThreads: NestedClubThread[] = []

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

        return { rootThreads, threadMap }
    }
)


export const {
    useCreateClubThreadMutation,
    useReplyToClubThreadMutation,
    useGetClubThreadsBatchQuery,
    // useGetThreadsQuery,
    useDeleteClubThreadMutation
} = apiSliceWithClubDiscussions
