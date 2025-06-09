import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGetAllNotificationsQuery, useUpdateNotificationsAsReadMutation } from "./notificationSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import NotifictionsToDisplay from "./NotifictionsToDisplay";

function NotificationHeader() {
    const unreadNotificationIds = useRef<number[]>([]);

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const [updateNotificationsAsRead] = useUpdateNotificationsAsReadMutation();
    const { data: notifications, refetch: refetchNotifications } = useGetAllNotificationsQuery(undefined);

    // determining unread notification count whenever notifications cache is updated
    const unreadNotificationCount = useMemo(() => {
        return notifications?.filter(n => !n.read).length;
    }, [notifications])

    // updating the collection of unread notification ids when notifications are retrieved
    useLayoutEffect(() => {
        if (notifications) {
            unreadNotificationIds.current = [];
            notifications.forEach((n) => {
                if (!n.read) {
                    unreadNotificationIds.current.push(n.notificationId);
                }
            })
            console.log(unreadNotificationIds)
        }
    }, [notifications]);

    const clickNotification = async () => {
        // opened when clicked case
        // mark all notifications as read when you close the menu
        if (open) {
            // send request to update unread notifications to set as "read" 
            try {
                await updateNotificationsAsRead(unreadNotificationIds.current).unwrap();
                refetchNotifications();
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
        setOpen(!open);
    }


    return (
        <div className="nav-header-mobile-notification">
            <div onClick={clickNotification}> notifs - {unreadNotificationCount}</div>
            {open && <NotifictionsToDisplay setOpen={setOpen}/>}
        </div>
    );
}

export default NotificationHeader;