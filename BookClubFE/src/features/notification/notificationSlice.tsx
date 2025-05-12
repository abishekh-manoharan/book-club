import { apiSlice } from "../api/apiSlice";

interface NewNotification {
    Text: string,
    Link?: string,
}

interface NewNotificationForSingleUser extends NewNotification {
    UserId: number
}

interface NewNotificationForReadingMembers extends NewNotification {
    ClubId: number,
    BookId: number
}

interface NewNotificationForClubMembers extends NewNotification {
    ClubId: number,
}

interface NotificationBatchInput {
    pageNumber: number,
    batchSize: number
}

export interface Notification {
    notificationId: number,
    userId: number,
    text: string,
    link?: string,
    time: string,
    read: boolean
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
            }
        }),
        getNotificationBatch: builder.query<Notification[], NotificationBatchInput>({
            query: (batchInput) => ({
                url: `notification/notificationBatch`,
                credentials: 'include',
                body: batchInput,
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
            }
        }),
        notifySingleUser: builder.mutation<Notification, NewNotificationForSingleUser>({
            query: (notification) => ({
                url: 'notification/notificationForSingleUser',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(notification),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        notifyReadingUsers: builder.mutation<Notification, NewNotificationForReadingMembers>({
            query: (notification) => ({
                url: 'notification/notificationForReadingMembers',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(notification),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        notifyClubMembers: builder.mutation<Notification, NewNotificationForClubMembers>({
            query: (notification) => ({
                url: 'notification/notificationForClubMembers',
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(notification),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        updateNotificationsAsRead: builder.mutation<number[], number[]>({
            query: (notifications) => ({
                url: 'notification/notificationsAsRead',
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify(notifications),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
    })
})

export const {
    useGetAllNotificationsQuery,
    useNotifySingleUserMutation,
    useNotifyReadingUsersMutation,
    useNotifyClubMembersMutation,
    useUpdateNotificationsAsReadMutation,
    useGetNotificationBatchQuery
} = apiSliceWithClub    