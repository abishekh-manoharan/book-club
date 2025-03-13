import React from 'react';
import { useGetJoinRequestsQuery } from '../../clubSlice';
import JoinRequest from './JoinRequest';

interface JoinRequestProps {
    clubId: number
}

function JoinRequests(props: JoinRequestProps) {
    const { data: joinRequests, isSuccess: joinRequestsIsSuccess } = useGetJoinRequestsQuery(props.clubId)

    if (joinRequestsIsSuccess) {
        if(joinRequests) {
            return joinRequests.map((req) => <JoinRequest key={`${req.clubId}${req.userId}`} userId={req.userId} clubId={req.clubId} userName={req.userName} fName={req.fName} lName={req.lName}/>)
        }
    }

    return (
        <></>
    );
}

export default JoinRequests;