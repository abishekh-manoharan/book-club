import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Notification from "./Notification";
import { useGetAllNotificationsQuery, useUpdateNotificationsAsReadMutation } from "./notificationSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";


function NotificationList() {
    const { data: notifications, refetch: refetchNotifications } = useGetAllNotificationsQuery(undefined);
    const [ updateNotificationsAsRead ] = useUpdateNotificationsAsReadMutation();
    const [open, setOpen] = useState(false);
    const unreadNotificationIds = useRef<number[]>([]);
    const dispatch = useAppDispatch();

    // determining unread notification count whenever notifications cache is updated
    const unreadNotificationCount = useMemo(() => {
        return notifications?.filter(n => !n.read).length;
    }, [notifications])
    
    // sorting notifications by start date 
    const sortedNotifications = useMemo(() => {
        const notificationCopy = notifications?.slice();
        return notificationCopy?.sort((a, b) => {
            return new Date(b.time).getTime() - new Date(a.time).getTime()
        });
    }, [notifications]);

    // updating the collection of unread notification ids when notifications are retrieved
    useLayoutEffect(() => {
        if (notifications) {
            unreadNotificationIds.current = [];
            notifications.forEach((n) => {
                if(!n.read){
                    unreadNotificationIds.current.push(n.notificationId);
                }
            })
            console.log(unreadNotificationIds)
        }
    }, [notifications]);

    const clickNotification = async () => {
        // closed when clicked case
        // mark all notifications as read when clicked
        if(!open) {
            // send request to update unread notifications to set as "read"
            try {
                const res = await updateNotificationsAsRead(unreadNotificationIds.current).unwrap();
                console.log("Success:", res);
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    const errorMessage = (error.data as string) || "Unknown error";
                    dispatch(updateErrorMessageThunk(errorMessage));
                } else if (isSerializedError(error)) {
                    dispatch(updateErrorMessageThunk(error.message!));
                } else {
                        dispatch(updateErrorMessageThunk("Unknown error occured."));
                }
            }
        }
        else {
            // refetch notifications when the notification component is closed
            refetchNotifications();
        }

        setOpen(!open);
    }

    return (
        <>
            <div onClick={clickNotification}> notifs - {unreadNotificationCount}</div>
            <div hidden={!open}>
                {
                    sortedNotifications?.map((n) => <><Notification notif={n} /><br /></>)
                }
            </div>
        </>
    );
}

export default NotificationList;