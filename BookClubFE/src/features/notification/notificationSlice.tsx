import { apiSlice } from "../api/apiSlice";

interface NewNotification {
    NotificationId: number,
    UserId: number,
    Text: string,
    Link?: string,
    Time: Date
}

interface Notification {
    notificationId: number,
    userId: number,
    text: string,
    link?: string,
    time: string
}

export const apiSliceWithClub = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query<Notification[], undefined>({
            query: () => ({
                url: `notification/notifications`,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),            
            transformResponse(res: {$id: string, $values: Notification[]}){
                const notifications = res.$values;
                const notificationsWithUpdateDateValues = notifications.map((n) => {
                    const updatedTime = new Date(n.time+"Z").toLocaleString()
                    
                    const updatedNotification: Notification = {
                        ...n,
                        time: updatedTime
                    }

                    return updatedNotification;
                })
                return notificationsWithUpdateDateValues;
            },
            providesTags: [{type: "Meetings", id: "all"}]
        })
    })
})

export const {
    useGetAllNotificationsQuery
} = apiSliceWithClub    