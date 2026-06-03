import React, { useEffect, useRef } from 'react';
import DeleteItem from './DeleteItem';
import { NestedThread } from '../discussionSlice';
import { ClubUser } from '@/features/club/clubSlice';

function ThreadDropdown({
    setOpen,
    userId,
    thread,
    clubUser,
    setHideDeleteModal }: {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
        userId: number | undefined,
        thread: NestedThread,
        clubUser: ClubUser | undefined,
        setHideDeleteModal: React.Dispatch<React.SetStateAction<boolean>>

    }) {
    const ref = useRef<HTMLDivElement | undefined>();
    console.log("open thread dropdown")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            event.stopPropagation();
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen]);

    return (
        <div ref={ref} className="thread dropdown">
            {(userId === thread.userId || clubUser?.admin) && !thread.deleted && <DeleteItem setHideDeleteModal={setHideDeleteModal}/>}
            nothing
        </div>
    );
}

export default ThreadDropdown;