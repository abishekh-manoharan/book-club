import { Club } from '@/utils/types';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetClubUserQuery, useGetClubUsersQuery } from '../clubSlice';
import { useGetUserQuery } from '../../../features/auth/authSlice';

function ClubListEntry({ club }: { club: Club }) {
    const { data: clubUsers } = useGetClubUsersQuery({ clubId: Number(club.clubId) });
    const { data: creator } = useGetUserQuery(Number(club.userID));

    return (
        <Link to={`/club/${club.clubId}`} key={club.clubId}>
            <div className="clubListEntry">
                {club.profileImg}
                {club.name}
                {clubUsers?.length}
                {creator?.fName}
            </div>
        </Link>
    );
}

export default ClubListEntry;