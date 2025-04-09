import { apiSlice } from "../api/apiSlice";

export interface Meeting {
    meetingId: number,
    bookId: number,
    clubId: number,
    name: string,
    description?: string,
    startTime: string,
    endTime?: string,
}

export interface NewMeeting {
    bookId: number,
    clubId: number,
    name: string,
    description?: string,
    startTime: Date,
    endTime?: Date,
}


export const apiSliceWithClub = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMeeting: builder.mutation<Meeting, NewMeeting>({
            query: (meeting) => ({
                url: 'meeting/create',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(meeting),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{type: "Meetings", id: "all"}]
        }),
        deleteMeeting: builder.mutation<Meeting, number>({
            query: (meetingId) => ({
                url: 'meeting/delete',
                credentials: 'include',
                method: 'DELETE',
                body: JSON.stringify(meetingId),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: [{type: "Meetings", id: "all"}]
        }),
        getAllMeetings: builder.query<Meeting[], { clubId: number, bookId: number }>({
            query: ({clubId, bookId}) => ({
                url: `meeting/GetAllMeetings?clubId=${clubId}&bookId=${bookId}`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),            
            transformResponse(res: {$id: string, $values: Meeting[]}){
                const meetings = res.$values;
                const meetingsWithUpdatedDates = meetings.map((m) => {
                    const updatedStartDate = new Date(m.startTime+"Z").toLocaleString()
                    const updatedEndDate = new Date(m.endTime!+"Z").toLocaleString();
                    
                    const updatedMeeting: Meeting = {
                        ...m,
                        startTime: updatedStartDate,
                        endTime: updatedEndDate
                    }

                    return updatedMeeting;
                })
                return meetingsWithUpdatedDates;
            },
            providesTags: [{type: "Meetings", id: "all"}]
        })
        // getClub: builder.query<Club, number>({
        //     query: (clubId) => ({
        //         url: `club/getOneClub?clubId=${clubId}`,
        //         credentials: 'include',
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        // }),

    })
})

export const {
    useCreateMeetingMutation,
    useDeleteMeetingMutation,
    useGetAllMeetingsQuery
} = apiSliceWithClub