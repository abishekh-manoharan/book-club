import { apiSlice } from "../api/apiSlice";
import { Book } from "../book/bookSlice";

export interface UpdatedProfile {
    bio?: string,
    fName: string,
    profileImg: string
}

export const apiSliceWithUser = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation<null, UpdatedProfile>({
            query: (info) => ({
                url: 'profile/update',
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getFavourites: builder.query<Book[], number>({
            query: (userId) => ({
                url: `profile/getFavourites?UserId=${userId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: { $id: string, $values: Book[] }) {
                return res.$values;
            },
            providesTags: [{ type: 'Readings', id: 'all' }]
        }),
        addFavourite: builder.mutation<Book, Book>({
            query: (club) => ({
                url: 'profile/addFavourite',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(club),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{ type: 'Clubs' }]
        }),
        removeFavourite: builder.mutation<Book, number>({
            query: (bookId) => ({
                url: `profile/removeFavourite?BookId=${bookId}`,
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(bookId),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{ type: 'Clubs' }]
        }),
    })
});

export const {
    useUpdateProfileMutation,
    useGetFavouritesQuery
} = apiSliceWithUser