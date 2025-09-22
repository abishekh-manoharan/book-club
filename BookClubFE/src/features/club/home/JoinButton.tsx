import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectLoginStatus } from "../../../features/auth/authSlice";
import { ClubUser, useGetJoinRequestQuery, useJoinClubMutation } from "../clubSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Club } from "@/utils/types";

interface JoinButtonProps {
    clubId: number,
    privateClub: boolean,
    clubUser: ClubUser | undefined,
    getClubUserError: FetchBaseQueryError | SerializedError | undefined,
    isClubUserError: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetchGetClubUser: any,
    userId: number | undefined,
    club: Club | undefined
}

function JoinButton({ clubId, privateClub, clubUser, getClubUserError, isClubUserError, refetchGetClubUser, userId, club }: JoinButtonProps) {
    const status = useAppSelector(selectLoginStatus);

    const [joinClub] = useJoinClubMutation();

    const { data: joinRequest, error: getJoinRequestError, isError: isJoinRequestError, refetch: refetchGetJoinRequest } = useGetJoinRequestQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !userId }
    );

    const [joinButton, setJoinButton] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const joinClubBtnClickHandler = async () => {
            console.log({ userId: userId as number, clubId: club?.clubId as number });
            try {
                await joinClub({ UserId: userId as number, ClubId: club?.clubId as number }).unwrap();
                refetchGetJoinRequest();
                refetchGetClubUser();
            } catch (e) {
                console.log("e");
                console.log(e);
            }
        }

        if ( // case where user is logged in, the user isn't a club member (clubUser doesn't exist), and there isnt a join request already
            status
            && isClubUserError && getClubUserError != undefined && 'originalStatus' in getClubUserError && getClubUserError.originalStatus === 404
            && isJoinRequestError && getJoinRequestError != undefined && 'originalStatus' in getJoinRequestError && getJoinRequestError.originalStatus === 404
            && privateClub
        ) {
            setJoinButton(<button onClick={joinClubBtnClickHandler}>Request Join club</button>);
        } if ( // case where user is logged in, the user isn't a club member (clubUser doesn't exist), and there isnt a join request already
            status
            && isClubUserError && getClubUserError != undefined && 'originalStatus' in getClubUserError && getClubUserError.originalStatus === 404
            && isJoinRequestError && getJoinRequestError != undefined && 'originalStatus' in getJoinRequestError && getJoinRequestError.originalStatus === 404
            && !privateClub
        ) {
            setJoinButton(<button onClick={joinClubBtnClickHandler}>Join club</button>);
        } else if ( // case where user is logged in, the user isn't a club member (clubUser doesn't exist), and there is join request already
            status
            && isClubUserError && getClubUserError != undefined && 'originalStatus' in getClubUserError && getClubUserError.originalStatus === 404
            && !isJoinRequestError
        ) {
            setJoinButton(<button onClick={joinClubBtnClickHandler} disabled>Invitation Sent {joinRequest && joinRequest.clubId} </button>)
        } else if (!status || !getClubUserError) {
            setJoinButton(<></>)
            console.log("no join button")
        }
    }, [clubUser, joinRequest, getClubUserError, getJoinRequestError, status, club, userId, joinClub, isClubUserError, isJoinRequestError, refetchGetJoinRequest, refetchGetClubUser, privateClub]);

    return (
        <>
            {joinButton}
        </>
    );
}

export default JoinButton;