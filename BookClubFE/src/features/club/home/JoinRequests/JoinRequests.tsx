import React from 'react';
import { useGetJoinRequestsQuery } from '../../clubSlice';
import JoinRequest from './JoinRequest';
import { useParams } from 'react-router-dom';

// interface JoinRequestProps {
//     clubId: number
// }

function JoinRequests() {
    const { clubid } = useParams();
    const { data: joinRequests, isSuccess: joinRequestsIsSuccess } = useGetJoinRequestsQuery(Number(clubid))

    if (joinRequestsIsSuccess) {
        if(joinRequests.length > 0) {
            return joinRequests.map((req) => <JoinRequest key={`${req.clubId}${req.userId}`} userId={req.userId} clubId={req.clubId} userName={req.userName} fName={req.fName} lName={req.lName}/>)
        }
        return <div className='mediumText textAlignCenter'>No join requests</div>
    }
    else {
        return <div className='mediumText textAlignCenter'>error retrieving join requests. Please try again later.</div>
    }
}

export default JoinRequests;