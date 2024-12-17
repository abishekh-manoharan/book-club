import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "@/app/store";

type LoginSuccess = boolean;
type LoginError = {
    [key: string]: string | string[]
}
type LoginResponse = LoginSuccess | LoginError;

type RegistrationModelStateError = {
    [key: string]: string
};
type RegistrationAllowanceError = string[];
type RegistrationSuccess = string[];
type RegistrationResponse = RegistrationModelStateError | RegistrationAllowanceError | RegistrationSuccess;

export interface RegistrationFormData {
    Username: string,
    Fname: string,
    LName: string,
    Email: string,
    password: string
}


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
            query: () => ({
                url: 'auth/isloggedin',
                credentials: 'include'
            }),
            providesTags: [{ type: 'Auth', id: 'status' }]
        }),
        login: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: (info) => ({
                url: 'auth/login',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: () => ([{ type: 'Auth', id: 'status' }])
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                credentials: 'include',
                method: 'POST'
            }),
            invalidatesTags: () => ([{type: 'Auth', id: 'status'}])
        }),
        register: builder.mutation<RegistrationResponse, RegistrationFormData>({
            query: (info) => ({
                url: 'auth/register',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
});

// export const {  } = authSlice.actions;
export const selectLoginStatus = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;


export const { 
    useGetStatusQuery, 
    useLoginMutation,
    useLogoutMutation, 
    useRegisterMutation 
} = apiSliceWithAuth;




