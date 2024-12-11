import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "@/app/store";

type LoginSuccess = boolean;
type LoginError = {
    [key: string]: string | string[]
}
type LoginResponse = LoginSuccess | LoginError;

const initialState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // loginStatusInitiated(state, action: PayloadAction<boolean>) {
        //     state.isLoggedIn = action.payload; 
        // }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSliceWithAuth.endpoints.getStatus.matchFulfilled, (state, action) => {
            state.isLoggedIn = action.payload;
        })
    }
})

export const apiSliceWithAuth = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStatus: builder.query<boolean, void>({
            query: () => 'auth/isloggedin',
            providesTags: [{ type: 'Auth', id: 'status' }]
        }),
        login: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: (info) => ({
                url: 'auth/login',
                credentials: 'include',
                method: 'POST',
                body: info,
                headers: {
                    'Content-Type': 'x-www-form-urlencoded'
                }
            }),
            invalidatesTags: () => ([{ type: 'Auth', id: 'status' }])
        })
    })
});

// export const {  } = authSlice.actions;
export const selectLoginStatus = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;


export const { useGetStatusQuery, useLoginMutation } = apiSliceWithAuth;




