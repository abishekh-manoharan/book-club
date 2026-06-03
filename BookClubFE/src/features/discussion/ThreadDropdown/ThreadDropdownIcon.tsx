import React, { useState } from 'react';
import ThreadDropdown from './ThreadDropdown';
import { NestedThread } from '../discussionSlice';
import { ClubUser } from '@/features/club/clubSlice';

function ThreadDropdownIcon({
    userId,
    thread,
    clubUser,
    setHideDeleteModal
}: {
    userId: number | undefined,
    thread: NestedThread,
    clubUser: ClubUser | undefined,
    setHideDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className='dropdownIcon'>
            <img onClick={() => setOpen((prev) => !prev)} src="/src/assets/images/more-horizontal.svg" />
            {open && <ThreadDropdown
                open={open}
                setOpen={setOpen}
                userId={userId}
                thread={thread}
                clubUser={clubUser}
                setHideDeleteModal={setHideDeleteModal}
            />}
        </div>
    );
}

export default ThreadDropdownIcon;