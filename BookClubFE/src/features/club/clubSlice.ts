import { Club } from "@/utils/types";
import { apiSlice } from "../api/apiSlice";
import { CreateClubFormData } from "./Create";

export interface JoinRequest {
    clubId: number,
    userId: number,
    request: boolean,
    invitation: boolean,
    userName: string,
    fname?: string,
    lname?: string
}

export const apiSliceWithClub = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createClub: builder.mutation<Club, CreateClubFormData>({
            query: (club) => ({
                url: 'club/create',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(club),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),

        }),
        getClub: builder.query<Club, number>({
            query: (clubId) => ({
                url: `club/getOneClub?clubId=${clubId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getClubUser: builder.query<{userId: number, clubId: number, admin: boolean}, {userId: number, clubId: number}> ({
            query: (clubUser) => ({
                url: `club/getOneClubUser?clubId=${clubUser.clubId}&userId=${clubUser.userId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        joinClub: builder.mutation<boolean, {UserId: number, ClubId: number}>({
            query: (clubUser) => ({
                url: `club/join`,
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(clubUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getJoinRequest: builder.query<JoinRequest, {userId: number, clubId: number}> ({
            query: (joinRequest) => ({
                url: `club/joinRequest?clubId=${joinRequest.clubId}&userId=${joinRequest.userId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getJoinRequests: builder.query<JoinRequest[], number> ({
            query: (clubId) => ({
                url: `club/joinRequests?clubId=${clubId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(res: {$values: JoinRequest[], id: string}){
                console.log(res.$values);
                return res.$values;
            }
        }),
    })
})

export const { 
    useCreateClubMutation, 
    useGetClubQuery, 
    useJoinClubMutation, 
    useGetClubUserQuery, 
    useGetJoinRequestQuery,
    useGetJoinRequestsQuery    
} = apiSliceWithClub

// export const apiSliceWithCl= apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         register: builder.mutation<RegistrationSuccess, RegistrationFormData>({
//             query: (info) => ({
//                 url: 'auth/register',
//                 credentials: 'include',
//                 method: 'POST',
//                 body: JSON.stringify(info),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }),
//             transformResponse(res: { id: number, $values: RegistrationSuccess }) {
//                 return res.$values;
//             },
//             transformErrorResponse(res: FetchBaseQueryError) {
//                 if (res.data && typeof res.data === 'object') {
//                     if ('$values' in res.data) { // case where the error is a registration errors in their raw state
//                         const errors: RegistrationError = {
//                             errors: res.data.$values as string[],
//                             kind: "registrationError"
//                         }

//                         return errors;
//                     } else { // case where the error is a model state error
//                         const errors: RegistrationError = {
//                             ...res.data,
//                             kind: "modelStateError"
//                         }

//                         return errors;
//                     }
//                 }
//             }
//             // transformErrorResponse(res: {
//             //     [key: string]: string[]; // type for model state errors in their raw state
//             // } | {
//             //     $values: string[]; // type for registration error
//             // }) {
//             //     console.log("res");
//             //     console.log(res);
//             //     if ('$values' in res) { // case where the error is a registration errors in their raw state
//             //         const errors: RegistrationError = {
//             //             errors: res.$values,
//             //             kind: "registrationError"
//             //         }

//             //         return errors;
//             //     } else { // case where the error is a model state error
//             //         const errors: RegistrationError = {
//             //             ...res,
//             //             kind: "modelStateError"
//             //         }

//             //         return errors;
//             //     }
//             // }
//         })
//     })
// });