import React, { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
// import { useGetClubQuery, useGetClubUserQuery, useGetJoinRequestQuery, useJoinClubMutation } from '../clubSlice';
// import { selectLoginStatus, useGetUserIdQuery } from '../../auth/authSlice';
// import { useAppSelector } from '../../../app/hooks';
import JoinButton from './JoinButton';
import { useGetClubQuery, useGetClubUserQuery } from '../clubSlice';
import JoinRequests from './JoinRequests/JoinRequests';
import { useGetUserIdQuery } from '../../auth/authSlice';
import ReadingsList from '../../reading/ReadingsList';

function Club() {
    const { id } = useParams();
    const clubId = Number(id);
    const { data: userId } = useGetUserIdQuery();
    // const status = useAppSelector(selectLoginStatus);

    const { data: club, isError: isGetClubError } = useGetClubQuery(clubId);

    const { data: clubUser, error: getClubUserError, isError: isClubUserError, isSuccess: isClubUserSuccess, refetch: refetchGetClubUser } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );

    return (
        <div>
            {isGetClubError ? <>club not found</> : <>
                <>{club?.name}</><br></br>
                {isClubUserSuccess && clubUser.admin && <Link to="./createREading">create reading</Link>}
                <Outlet />
                <ReadingsList clubId={clubId}/>
                {/* // <>{userId}</><br />  */}
                {/* hide joing button if use isn't logged in or if the user is a club member already */}
                <JoinButton clubId={clubId} />
                <JoinRequests clubId={clubId} />
                <br />
            </>
            }
        </div>
    );
}

export default Club;