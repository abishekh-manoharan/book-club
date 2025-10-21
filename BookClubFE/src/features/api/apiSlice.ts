import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BE_URL = import.meta.env.VITE_BE_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BE_URL }),
    tagTypes: ['Auth', 'Readings', 'Meetings', 'Threads', 'Clubs'],
    endpoints: () => ({
        
    }),
})

// export const { } = apiSlice
