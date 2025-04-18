import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "@/app/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type LoginSuccess = boolean;
type LoginError = {
    [key: string]: string[]
}
type LoginResponse = LoginSuccess | LoginError;

type RegistrationModelStateError = {
    [key: string]: string[] | string;
    kind: 'modelStateError';
};

export interface RegistrationAllowanceError {
    errors: string[];
    kind: 'registrationError';
}

export interface User {
    userId: number,
    bio: string,
    fName: string,
    lName: string,
    profileImg: string,
}

export type RegistrationError = RegistrationModelStateError | RegistrationAllowanceError;

export type RegistrationSuccess = string[];


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
        getUserId: builder.query<number, void>({
            query: () => ({
                url: 'auth/userid',
                credentials: 'include'
            }),
            providesTags: [{ type: 'Auth', id: 'userId' }]
        }),
        getUser: builder.query<User, number>({
            query: (userId) => ({
                url: `auth/user?userId=${userId}`,
                credentials: 'include'
            }),
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
            invalidatesTags: () => ([{ type: 'Auth', id: 'status' }, { type: 'Auth', id: 'userId' }])
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                credentials: 'include',
                method: 'POST'
            }),
            invalidatesTags: () => ([{ type: 'Auth', id: 'status' }, { type: 'Auth', id: 'userId' }])
        }),
        register: builder.mutation<RegistrationSuccess, RegistrationFormData>({
            query: (info) => ({
                url: 'auth/register',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: { id: number, $values: RegistrationSuccess }) {
                return res.$values;
            },
            transformErrorResponse(res: FetchBaseQueryError) {
                if (res.data && typeof res.data === 'object') {
                    if ('$values' in res.data) { // case where the error is a registration errors in their raw state
                        const errors: RegistrationError = {
                            errors: res.data.$values as string[],
                            kind: "registrationError"
                        }

                        return errors;
                    } else { // case where the error is a model state error
                        const errors: RegistrationError = {
                            ...res.data,
                            kind: "modelStateError"
                        }

                        return errors;
                    }
                }
            }
            // transformErrorResponse(res: {
            //     [key: string]: string[]; // type for model state errors in their raw state
            // } | {
            //     $values: string[]; // type for registration error
            // }) {
            //     console.log("res");
            //     console.log(res);
            //     if ('$values' in res) { // case where the error is a registration errors in their raw state
            //         const errors: RegistrationError = {
            //             errors: res.$values,
            //             kind: "registrationError"
            //         }

            //         return errors;
            //     } else { // case where the error is a model state error
            //         const errors: RegistrationError = {
            //             ...res,
            //             kind: "modelStateError"
            //         }

            //         return errors;
            //     }
            // }
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
    useRegisterMutation,
    useGetUserIdQuery,
    useGetUserQuery
} = apiSliceWithAuth;




