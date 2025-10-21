import { Outlet, useParams } from 'react-router-dom';
// import { useGetClubQuery, useGetClubUserQuery, useGetJoinRequestQuery, useJoinClubMutation } from '../clubSlice';
// import { selectLoginStatus, useGetUserIdQuery } from '../../auth/authSlice';
// import { useAppSelector } from '../../../app/hooks';
import JoinButton from './JoinButton';
import { useGetClubQuery, useGetClubUserQuery, useLeaveClubMutation } from '../clubSlice';
// import JoinRequests from './JoinRequests/JoinRequests';
import { useGetUserIdQuery, useGetUserQuery } from '../../auth/authSlice';
import ClubNavBar from './ClubNavBar';
import { isFetchBaseQueryError, isSerializedError } from "../../../app/typeGuards";
import { updateErrorMessageThunk } from "../../error/errorSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useRef } from 'react';

function Club() {
    const dispatch = useAppDispatch();
    const leaveBtn = useRef(null);
    
    const { clubid } = useParams();
    const clubId = Number(clubid);
    const { data: userId } = useGetUserIdQuery();

    const { data: club, isError: isGetClubError, isSuccess: isGetClubSuccess, isFetching: isGetClubFetching }
        = useGetClubQuery(clubId);
    const { data: clubUser, isSuccess: isClubUserSuccess, error: getClubUserError, isError: isClubUserError, refetch: refetchGetClubUser, isFetching: isClubUserFetching }
        = useGetClubUserQuery(
            { clubId: clubId, userId: userId as number },
            { skip: !userId }
        );
    const { data: creator, isSuccess: getCreatorSuccess } = useGetUserQuery(Number(club?.userID), { skip: !club });
    const [leave] = useLeaveClubMutation();



    const leaveButtonClickHandler = async () => {
        const user = {
            UserId: userId!,
            ClubId: clubId
        }

        try {
            await leave(user).unwrap();
            refetchGetClubUser();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                    dispatch(updateErrorMessageThunk("Unknown error occured."));
            }
        }
    }

    // flag indicating that the club is private, and the user isn't a member of the club
    const privateNonMember: boolean = !isGetClubFetching && isGetClubSuccess && isClubUserError && club.private;
    //transformedAdminClubsOfUser && transformedAdminClubsOfUser.includes(clubId) 
    return (
        <>
            {isGetClubError && !isGetClubFetching ?
                <h2>club not found</h2> :
                <div className={!privateNonMember && !isGetClubFetching ? "clubPagePublic" : "clubPagePrivate"}>
                    {/* <div className={!privateNonMember && !isClubUserFetching && !isGetClubFetching ? "clubPagePublic" : "clubPagePrivate"}> */}
                    {/* <JoinRequests clubId={clubId} /> */}
                    <img className="clubImg" src='https://placecats.com/400/400' alt='club profile picture' />
                    <h1 className="clubName">{club?.name}</h1>
                    <div className="clubDescription">
                        <p className="clubDescriptionDisc">{club?.description}</p>
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ante metus, fermentum id enim tempor, accumsan semper dolor. Morbi sagittis, diam eu finibus ullamcorper, justo ligula malesuada lectus, eu varius nisl nulla nec metus. Suspendisse nec eros scelerisque, tristique sem eu, aliquet sapien. Aliquam fe */}
                        <p className="clubCreator">Created by {creator?.fName} {creator?.lName}</p>
                    </div>
                    {!privateNonMember && !isGetClubFetching &&
                        <>
                            <div className="clubSettings">
                                {/* leave button displayed if the user is a club member and not the creator  */}
                                {clubId && userId && isClubUserSuccess && clubUser && getCreatorSuccess && creator && creator.userId != userId && <button ref={leaveBtn} onClick={leaveButtonClickHandler}>Leave</button>}
                            </div>
                            <ClubNavBar />
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
                                    <hr className='line' />
                                    <img className="lock" src='/src/assets/images/lock.svg' alt='image of a lock indicating a private club' />
                                    <hr className='line' />
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