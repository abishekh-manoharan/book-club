// Notification list modal

import React, { useEffect, useState } from 'react';
import { Notification, useGetNotificationBatchQuery } from './notificationSlice';
import NotificationComponent from './Notification';

const BATCH_SIZE = 2;

// function NotifictionsToDisplay({notifications}:{ notifications: Notification[]}) {
function NotifictionsToDisplay({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [page, setPage] = useState(1);
    const { data: notificationBatch } = useGetNotificationBatchQuery({ batchSize: BATCH_SIZE, pageNumber: page }); // runs whenever page is updated
    const [notificationsToDisplay, setNotificationsToDisplay] = useState<Notification[]>([]);

    // useEffect intended to handle clicks outside the modal
    useEffect(() => {
        // retrieve element to compare click location to 
        const notifModal = document.querySelector(".nav-header-mobile-notification-list");

        // if notifications list doesnt contain the element clicked, close the notification modal
        const handleClick = (e: MouseEvent) => {
            if(e.target instanceof Node && !notifModal?.contains(e.target)){
                console.log('clicked outside')
                // setOpen(false);
            }
        }
        // add click listener
        document.addEventListener('click', handleClick)

        return () => {
            // remove click listener
            document.removeEventListener('click', handleClick);
        }
    }, [setOpen]);
    
    useEffect(() => {
        setNotificationsToDisplay(notificationBatch!);
        console.log(notificationBatch);
    }, [notificationBatch])

    return (
        <div className="nav-header-mobile-notification-list">
            <>{notificationsToDisplay?.map((n) => <NotificationComponent notif={n} />)}</>
            {page > 1 ? <div onClick={() => setPage(p => p - 1)}>newer</div> : <></>}
            <div onClick={() => setPage(p => p + 1)}>older</div>
            {page}
        </div>
    );
}

export default NotifictionsToDisplay;

