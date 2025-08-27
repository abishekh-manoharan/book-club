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
    const { clubid } = useParams();
    const clubId = Number(clubid);
    const { data: userId } = useGetUserIdQuery();
    // const status = useAppSelector(selectLoginStatus);

    const { data: club, isError: isGetClubError } = useGetClubQuery(clubId);

    const { data: clubUser, error: getClubUserError, isError: isClubUserError, isSuccess: isClubUserSuccess, refetch: refetchGetClubUser } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );

    return (
        <div>
            {isGetClubError ?
                <h2>club not found</h2> :
                <div className="clubPage">
                    <img className="clubImg" src='https://placecats.com/400/400' alt='club profile picture' />
                    <div className="clubName">name</div>
                    <div className="clubDescription">desc</div>
                    <div className="clubSettings">settings</div>
                    <div className="clubNavBar">
                        <div className="item">readings</div>
                        <div className="item">meetings</div>
                        <div className="item">discussions</div>
                    </div>
                    <Outlet/>
                </div>
                // <>
                //     <>{club?.name}</><br></br>
                //     {isClubUserSuccess && clubUser.admin && <Link to="./createREading">create reading</Link>}
                //     <Outlet />
                //     <ReadingsList clubId={clubId} />
                //     {/* // <>{userId}</><br />  */}
                //     {/* hide joing button if use isn't logged in or if the user is a club member already */}
                //     <JoinButton clubId={clubId} />
                //     <JoinRequests clubId={clubId} />
                //     <br />
                // </>
            }

        </div>
    );
}

export default Club;