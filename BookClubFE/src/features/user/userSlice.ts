import { apiSlice } from "../api/apiSlice";

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
        })
    })
});

export const {
    useUpdateProfileMutation
} = apiSliceWithUser