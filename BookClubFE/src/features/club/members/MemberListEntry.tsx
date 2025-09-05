import React from 'react';

interface MemberListEntryProps {
    aspnetusersId: string;
    bio: null | string;
    fName: string;
    lName: string;
    profileImg: null | string;
    userId: number;
    admin: boolean;
}

function MemberListEntry({ aspnetusersId, bio, fName, lName, profileImg, userId, admin }: MemberListEntryProps) {
    return (
        <>
            <div className="memberListEntry">
                <div className="adminStatus inline">{admin ? <img src="/src/assets/images/key.svg" /> : ""}</div>
                <img src="https://placecats.com/100/100" className="profilePicture" alt='member profile picture' />
                <div className="name inline">{fName} {lName}</div><br />
            </div>
            <div className="line" />
        </>
    );
}

export default MemberListEntry;