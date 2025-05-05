import { useMemo } from "react";
import Notification from "./Notification";
import { useGetAllNotificationsQuery } from "./notificationSlice";

function NotificationList() {
    const { data: notifications } = useGetAllNotificationsQuery(undefined);


    // sorting notifications by start date 
    const sortedNotifications = useMemo(() => {
        const notificationCopy = notifications?.slice();
        return notificationCopy?.sort((a, b) => {
            return new Date(b.time).getTime() - new Date(a.time).getTime()
        });
    }, [notifications]);

    return (
        <div>
            notifs
            {
                sortedNotifications?.map((n) => <><Notification notif={n} /><br /></>)
            }
        </div>
    );
}

export default NotificationList;