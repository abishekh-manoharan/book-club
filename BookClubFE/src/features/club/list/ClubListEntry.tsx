import { Club } from '@/utils/types';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetClubUsersQuery } from '../clubSlice';
import { useGetUserQuery } from '../../auth/authSlice';

function ClubListEntry({ club }: { club: Club }) {
    const { data: clubUsers } = useGetClubUsersQuery({ clubId: Number(club.clubId) });
    const { data: creator } = useGetUserQuery(Number(club.userID));

    return (
        <Link className="clubListEntry-link" to={`/club/${club.clubId}`} key={club.clubId}>
            <div className="clubListEntry">
                {/* <div className="clubListEntry-profileImg"> */}
                <img src="https://placecats.com/400/400" alt="club profile picture" className='clubListEntry-profileImg' />
                {/* </div> */}
                <div className="clubListEntry-name">{club.name}</div>
                <div className="clubListEntry-length">
                    <img className="clubListEntry-user userLogo" src='src/assets/images/user.svg' />{clubUsers?.length}
                </div>
                <div className="clubListEntry-creator">created by {creator?.fName} {creator?.lName}</div>
            </div>
        </Link>
    );
}

export default ClubListEntry;