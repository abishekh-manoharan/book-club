// Notification list modal

import React, { useEffect, useRef, useState } from 'react';
import { Notification, useGetNotificationBatchQuery } from './notificationSlice';
import NotificationComponent from './Notification';

const BATCH_SIZE = 2;

// function NotifictionsToDisplay({notifications}:{ notifications: Notification[]}) {
function NotifictionsToDisplay({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(1);
    const { data: notificationBatch } = useGetNotificationBatchQuery({ batchSize: BATCH_SIZE, pageNumber: page }); // runs whenever page is updated
    const [notificationsToDisplay, setNotificationsToDisplay] = useState<Notification[]>([]);

    useEffect(() => {
        if (notificationBatch) {
            setNotificationsToDisplay(notificationBatch!);
        }
        console.log(notificationBatch);
    }, [notificationBatch])

    // useEffect intended to handle clicks outside the modal
    useEffect(() => {
        console.log('effect running')
        // retrieve element to compare click location to 
        const notifModal = ref.current;
        // const notifModal = document.querySelector(".nav-header-mobile-notification-list");

        // if notifications list doesnt contain the element clicked, close the notification modal
        const handleClick = (e: MouseEvent) => {

            e.stopPropagation();
            e.preventDefault();
            if (e.target instanceof Node && !notifModal?.contains(e.target)) {
                console.log(e.target);
                console.log('clicked outside')
                setTimeout(() => setOpen((state) => {
                    console.log(state)
                    return !state;
                }), 10);
            }
        }
        // add click listener
        document.addEventListener('click', handleClick, true)

        return () => {
            // remove click listener
            document.removeEventListener('click', handleClick, true);
        }
    }, []);


    return (
        <div ref={ref} className="nav-header-mobile-notification-list">
            <>{notificationsToDisplay?.map((n) => <NotificationComponent notif={n} />)}</>
            {page > 1 ? <div onClick={() => setPage(p => p - 1)}>newer</div> : <></>}
            <div onClick={() => setPage(p => p + 1)}>older</div>
            {page}
        </div>
    );
}

export default NotifictionsToDisplay;

