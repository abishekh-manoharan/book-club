import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGetAllNotificationsQuery, useUpdateNotificationsAsReadMutation } from "./notificationSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import NotifictionsToDisplay from "./NotifictionsToDisplay";

// const BATCH_SIZE = 2;

function NotificationHeader() {
    const unreadNotificationIds = useRef<number[]>([]);

    const dispatch = useAppDispatch();

    // const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const [updateNotificationsAsRead] = useUpdateNotificationsAsReadMutation();
    const { data: notifications, refetch: refetchNotifications } = useGetAllNotificationsQuery(undefined);
    // const { data: notificationBatch, refetch: refetchBatchNotifications } = useGetNotificationBatchQuery({ batchSize: BATCH_SIZE, pageNumber: page }); // runs whenever page is updated
    // const [notificationsToDisplay, setNotificationsToDisplay] = useState<NotificationType[]>([]);

    // // whenever notificationBatch is updated, we append the new entries
    // useEffect(() => {
    //     setNotificationsToDisplay(notificationsToDisplay => {
    //         if (notificationBatch) {
    //             return notificationsToDisplay.concat(...notificationBatch!)
    //         }
    //         else return [];
    //     })

    // }, [notificationBatch]);



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
        <>
            <div onClick={clickNotification}> notifs - {unreadNotificationCount}</div>
            {open && <NotifictionsToDisplay />}
            {/* <div hidden={!open}>
                {
                    notificationsToDisplay?.map((n) => <><Notification notif={n} /><br /></>)
                }
            </div> */}
            {/* <div onClick={() => setPage(p => p + 1)}> load more</div> */}
        </>
    );
}

export default NotificationHeader;