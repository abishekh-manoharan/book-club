import React from 'react';
import { useParams } from 'react-router-dom';
// import { useGetClubQuery, useGetClubUserQuery, useGetJoinRequestQuery, useJoinClubMutation } from '../clubSlice';
// import { selectLoginStatus, useGetUserIdQuery } from '../../auth/authSlice';
// import { useAppSelector } from '../../../app/hooks';
import JoinButton from './JoinButton';
import { useGetClubQuery } from '../clubSlice';
import JoinRequests from '../JoinRequests';

function ClubHome() {
    const { id } = useParams();
    const clubId = Number(id);

    // const status = useAppSelector(selectLoginStatus);

    const { data: club, isError: isGetClubError, isLoading,  } = useGetClubQuery(clubId);
    // const { data: userId } = useGetUserIdQuery();

    // const { data: clubUser } = useGetClubUserQuery(
    //     { clubId, userId: userId as number },
    //     { skip: !userId }
    // );
    // const { data: joinRequest, isError: joinRequestError } = useGetJoinRequestQuery(
    //     { clubId, userId: userId as number },
    //     { skip: !userId }
    // );




    // if (isGetClubError) {
    //     return <>Club Not Found</>
    // }

    return (
        <div>
            <>{club?.name}</><br></br>
            {/* // <>{userId}</><br />  */}
            {/* hide joing button if use isn't logged in or if the user is a club member already */}
            <JoinButton clubId={clubId}/>
            <JoinRequests clubId={clubId}/>
            <br />
        </div>
    );
}

export default ClubHome;