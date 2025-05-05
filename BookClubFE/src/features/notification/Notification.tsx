import { Notification as NotificationType } from "./notificationSlice";

function Notification(props: {notif: NotificationType}) {
    return (
        <div className={props.notif.read ? "readNotification" : "unreadNotification"}>
            {props.notif.text} <br/>
            {props.notif.time} <br/>
            {!props.notif.read && <>unread</>}
        </div>
    );
}

export default Notification;