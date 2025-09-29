import { Outlet, useParams } from 'react-router-dom';
// import { useGetClubQuery, useGetClubUserQuery, useGetJoinRequestQuery, useJoinClubMutation } from '../clubSlice';
// import { selectLoginStatus, useGetUserIdQuery } from '../../auth/authSlice';
// import { useAppSelector } from '../../../app/hooks';
import JoinButton from './JoinButton';
import { useGetClubQuery, useGetClubUserQuery } from '../clubSlice';
// import JoinRequests from './JoinRequests/JoinRequests';
import { useGetUserIdQuery, useGetUserQuery } from '../../auth/authSlice';
import ClubNavBar from './ClubNavBar';

function Club() {
    const { clubid } = useParams();
    const clubId = Number(clubid);
    const { data: userId } = useGetUserIdQuery();
    // const status = useAppSelector(selectLoginStatus);

    const { data: club, isError: isGetClubError, isSuccess: isGetClubSuccess, isFetching: isGetClubFetching }
        = useGetClubQuery(clubId);

    const { data: clubUser, error: getClubUserError, isError: isClubUserError, refetch: refetchGetClubUser, isFetching: isClubUserFetching }
        = useGetClubUserQuery(
            { clubId: clubId, userId: userId as number },
            { skip: !userId }
        );

    const { data: creator } = useGetUserQuery(Number(club?.userID), { skip: !club });

    // flag indicating that the club is private, and the user isn't a member of the club
    const privateNonMember: boolean = !isClubUserFetching && !isGetClubFetching && isGetClubSuccess && isClubUserError && club.private;

    return (
        <>
            {isGetClubError && !isGetClubFetching ?
                <h2>club not found</h2> :
                <div className={!privateNonMember && !isClubUserFetching && !isGetClubFetching ? "clubPagePublic" : "clubPagePrivate"}>
                    {/* <div className={!privateNonMember && !isClubUserFetching && !isGetClubFetching ? "clubPagePublic" : "clubPagePrivate"}> */}
                    {/* <JoinRequests clubId={clubId} /> */}
                    <img className="clubImg" src='https://placecats.com/400/400' alt='club profile picture' />
                    <h1 className="clubName">{club?.name}</h1>
                    <div className="clubDescription">
                        <p className="clubDescriptionDisc">{club?.description}</p>
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ante metus, fermentum id enim tempor, accumsan semper dolor. Morbi sagittis, diam eu finibus ullamcorper, justo ligula malesuada lectus, eu varius nisl nulla nec metus. Suspendisse nec eros scelerisque, tristique sem eu, aliquet sapien. Aliquam fe */}
                        <p className="clubCreator">Created by {creator?.fName} {creator?.lName}</p>
                    </div>
                    {!privateNonMember && !isClubUserFetching && !isGetClubFetching &&
                        <>
                            <div className="clubSettings">
                                settings
                            </div>
                            <ClubNavBar/>
                            {/* <div className="clubNavBar">
                                <Link to="readings" className="item">Readings</Link>
                                <Link to="members" className="item">Members</Link>
                                <Link to="readings" className="item">Discussions</Link>
                            </div> */}
                            <div className="clubPageOutlet">
                                <Outlet />
                                <JoinButton clubId={clubId} privateClub={club?.private || false} clubUser={clubUser} getClubUserError={getClubUserError} isClubUserError={isClubUserError} refetchGetClubUser={refetchGetClubUser} club={club} userId={userId} />
                            </div>
                        </>
                    }
                    {privateNonMember && !isClubUserFetching && !isGetClubFetching &&
                        <>
                            <div className="privateClub-screen outlet">
                                <div className="lockDesign">
                                    <hr className='line'/>
                                    <img className="lock" src='/src/assets/images/lock.svg' alt='image of a lock indicating a private club' />
                                    <hr className='line'/>
                                </div>
                                <div className="privateClubNotice">
                                    Private Club
                                </div>
                            </div>
                            <JoinButton clubId={clubId} privateClub={club?.private || false} clubUser={clubUser} getClubUserError={getClubUserError} isClubUserError={isClubUserError} refetchGetClubUser={refetchGetClubUser} club={club} userId={userId} />
                        </>
                    }

                </div>
            }
        </>
    );
}

export default Club;