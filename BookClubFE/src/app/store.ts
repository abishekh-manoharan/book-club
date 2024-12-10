import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/features/api/apiSlice'

import { listenerMiddleware } from './listenerMiddleware'
import authSlice from '@/features/auth/authSlice'
import clubSlice from '@/features/club/clubSlice'
import discussionSlice from '@/features/discussion/discussionSlice'
import meetingSlice from '@/features/meeting/meetingSlice'
import pollSlice from '@/features/poll/pollSlice'
import readingSlice from '@/features/reading/readingSlice'
import userSlice from '@/features/user/userSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    club: clubSlice,
    discussion: discussionSlice,
    meeting: meetingSlice,
    poll: pollSlice,
    reading: readingSlice,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(apiSlice.middleware),
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>