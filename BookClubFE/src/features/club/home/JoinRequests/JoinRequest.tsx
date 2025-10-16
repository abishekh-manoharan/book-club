import React from 'react';
import { useGetJoinRequestsQuery, useJoinClubMutation, useRejectJoinRequestMutation } from '../../clubSlice';

interface JoinRequestProps {
    userId: number,
    clubId: number,
    userName: string,
    fName: string | undefined,
    lName: string | undefined,
}

function JoinRequest(props: JoinRequestProps) {
    const [accept] = useJoinClubMutation();
    const [reject] = useRejectJoinRequestMutation();
    const { refetch: refetchJoinRequests } = useGetJoinRequestsQuery(props.clubId)

    const handleAcceptButtonClick = async () => {
        try {
            const res = await accept({ UserId: props.userId, ClubId: props.clubId }).unwrap();
            if (res) {
                refetchJoinRequests();
            }
        }
        catch (e) {
            // ERROR
            console.log(e)
        }
    }
    const handleRejectButtonClick = async () => {
        try {
            await reject({ UserId: props.userId, ClubId: props.clubId }).unwrap();
            console.log("reject success")
            refetchJoinRequests();
        }
        catch (e) {
            // ERROR
            console.log("reject fail")
            console.log(e)
        }
    }

    return (
        <div className="join-request">
            <div className="request-identifier">
                <div className="name">
                    {props.fName} {props.lName}
                </div>
                <div className="username mediumText">
                    {props.userName}
                </div>
            </div>
            <div className="request-buttons">
                <img src="/src/assets/images/check.svg" onClick={handleAcceptButtonClick}/>
                <img src="/src/assets/images/x.svg" onClick={handleRejectButtonClick}/>
            </div>
        </div>
    );
}

export default JoinRequest;