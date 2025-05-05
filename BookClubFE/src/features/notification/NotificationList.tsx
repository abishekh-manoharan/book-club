import { useGetAllNotificationsQuery } from "./notificationSlice";

function NotificationList() {
    const {data: notifications} = useGetAllNotificationsQuery(undefined);
    return (
        <div>
            notifs
            {
                notifications?.map((n)=><>{n.text} {n.time}<br/><br/></>)
            }
        </div>
    );
}

export default NotificationList;