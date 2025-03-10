import React from 'react';
import { useGetJoinRequestsQuery } from './clubSlice';

interface JoinRequestProps {
    clubId: number
}

function JoinRequests(props: JoinRequestProps) {
    const { data: joinRequests, isSuccess: joinRequestsIsSuccess } = useGetJoinRequestsQuery(props.clubId)
    
    if (joinRequestsIsSuccess) {
        if(joinRequests) {
            return joinRequests.map((req) => {return <>{req.userId}</>});}
    }

    return (
        <div>
            
        </div>
    );
}

export default JoinRequests;