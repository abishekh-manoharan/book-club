import React, { useEffect, useState } from 'react';
import { Notification, useGetNotificationBatchQuery } from './notificationSlice';
import NotificationComponent from './Notification';

const BATCH_SIZE = 2;

// function NotifictionsToDisplay({notifications}:{ notifications: Notification[]}) {
function NotifictionsToDisplay() {
    const [page, setPage] = useState(1);
    const { data: notificationBatch } = useGetNotificationBatchQuery({ batchSize: BATCH_SIZE, pageNumber: page }); // runs whenever page is updated
    const [notificationsToDisplay, setNotificationsToDisplay] = useState<Notification[]>([]);

    useEffect(() => {
        setNotificationsToDisplay(notificationBatch!);
        console.log(notificationBatch);
    }, [notificationBatch])

    return (
        <div>
            <>{notificationsToDisplay?.map((n) => <NotificationComponent notif={n} />)}</>
            {page > 1 ? <div onClick={() => setPage(p => p - 1)}>newer</div> : <></>}
            <div onClick={() => setPage(p => p + 1)}>older</div>
            {page}
        </div>
    );
}

export default NotifictionsToDisplay;

