import React, { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
// import { useGetClubQuery, useGetClubUserQuery, useGetJoinRequestQuery, useJoinClubMutation } from '../clubSlice';
// import { selectLoginStatus, useGetUserIdQuery } from '../../auth/authSlice';
// import { useAppSelector } from '../../../app/hooks';
import JoinButton from './JoinButton';
import { useGetClubQuery, useGetClubUserQuery } from '../clubSlice';
import JoinRequests from './JoinRequests/JoinRequests';
import { useGetUserIdQuery, useGetUserQuery } from '../../auth/authSlice';
import ReadingsList from '../../reading/ReadingsList';

function Club() {
    const { clubid } = useParams();
    const clubId = Number(clubid);
    const { data: userId } = useGetUserIdQuery();
    // const status = useAppSelector(selectLoginStatus);

    const { data: club, isError: isGetClubError, isFetching: isGetClubFetching } = useGetClubQuery(clubId);

    const { data: clubUser, error: getClubUserError, isError: isClubUserError, isSuccess: isClubUserSuccess, refetch: refetchGetClubUser } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );

    const { data: creator } = useGetUserQuery(Number(club?.userID), { skip: !club });

    return (
        <div>
            {isGetClubError && !isGetClubFetching ?
                <h2>club not found</h2> :
                <div className="clubPage">
                    <img className="clubImg" src='https://placecats.com/400/400' alt='club profile picture' />
                    <h1 className="clubName">{club?.name}</h1>
                    <div className="clubDescription">
                        <p className="clubDescriptionDisc">{club?.description}</p>
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ante metus, fermentum id enim tempor, accumsan semper dolor. Morbi sagittis, diam eu finibus ullamcorper, justo ligula malesuada lectus, eu varius nisl nulla nec metus. Suspendisse nec eros scelerisque, tristique sem eu, aliquet sapien. Aliquam fe */}
                        <p className="clubCreator">Created by {creator?.fName} {creator?.lName}</p>
                    </div>
                    <div className="clubSettings">settings</div>
                    <div className="clubNavBar">
                        <Link to="readings" className="item">readings</Link>
                        <div className="item">meetings</div>
                        <div className="item">discussions</div>
                    </div>
                    <Outlet />
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