import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BE_URL = "https://openlibrary.org/search.json?q=";

export const apiSliceOpenLibrary = createApi({
    reducerPath: 'apiOpenLibrary',
    baseQuery: fetchBaseQuery({ baseUrl: BE_URL }),
    tagTypes: ['Auth'],
    endpoints: () => ({
        
    }),
})