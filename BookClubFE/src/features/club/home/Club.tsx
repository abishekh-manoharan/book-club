import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
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

    const { data: club, isError: isGetClubError, isSuccess: isGetClubSuccess, isFetching: isGetClubFetching } = useGetClubQuery(clubId);

    const { data: clubUser, error: getClubUserError, isError: isClubUserError, isSuccess: isClubUserSuccess, isFetching: isClubUserFetching, refetch: refetchGetClubUser } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );

    const { data: creator } = useGetUserQuery(Number(club?.userID), { skip: !club });

    // flag indicating that the club is private, and the user isn't a member of the club
    const privateNonMember: boolean = !isClubUserFetching && !isGetClubFetching && isGetClubSuccess && isClubUserError && club.private;

    return (
        <div>
            {isGetClubError && !isGetClubFetching ?
                <h2>club not found</h2> :
                <div className="clubPage">
                    <JoinButton clubId={clubId} privateClub={club?.private} />
                    <JoinRequests clubId={clubId} />
                    <img className="clubImg" src='https://placecats.com/400/400' alt='club profile picture' />
                    <h1 className="clubName">{club?.name}</h1>
                    <div className="clubDescription">
                        <p className="clubDescriptionDisc">{club?.description}</p>
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ante metus, fermentum id enim tempor, accumsan semper dolor. Morbi sagittis, diam eu finibus ullamcorper, justo ligula malesuada lectus, eu varius nisl nulla nec metus. Suspendisse nec eros scelerisque, tristique sem eu, aliquet sapien. Aliquam fe */}
                        <p className="clubCreator">Created by {creator?.fName} {creator?.lName}</p>
                    </div>
                    <div className="clubSettings">settings</div>
                    {!privateNonMember && !isClubUserFetching && !isGetClubFetching &&
                        <>
                            <div className="clubNavBar">
                                <Link to="readings" className="item">Readings</Link>
                                <Link to="members" className="item">Members</Link>
                                <Link to="readings" className="item">Discussions</Link>
                            </div>
                            <div className="clubPageOutlet">
                                <Outlet />
                            </div>
                        </>
                    }
                </div>
                // <>
                //     <>{club?.name}</><br></br>
                //     {isClubUserSuccess && clubUser.admin && <Link to="./createREading">create reading</Link>}
                //     <Outlet />
                //     <ReadingsList clubId={clubId} />
                //     {/* // <>{userId}</><br />  */}
                //     {/* hide joing button if use isn't logged in or if the user is a club member already */}

                //     <br />
                // </>
            }

        </div>
    );
}

export default Club;