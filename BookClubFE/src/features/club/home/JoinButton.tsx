import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectLoginStatus, useGetUserIdQuery } from "../../../features/auth/authSlice";
import { useGetClubQuery, useGetClubUserQuery, useGetJoinRequestQuery, useJoinClubMutation } from "../clubSlice";


function JoinButton(props: { clubId: number }) {
    const status = useAppSelector(selectLoginStatus);
    const { data: club } = useGetClubQuery(props.clubId);
    const { data: userId } = useGetUserIdQuery();
    const [joinClub] = useJoinClubMutation();

    const { data: clubUser, error: getClubUserError, isError: isClubUserError} = useGetClubUserQuery(
        { clubId: props.clubId, userId: userId as number },
        { skip: !userId }
    );
    const { data: joinRequest, error: getJoinRequestError, isError: isJoinRequestError, refetch } = useGetJoinRequestQuery(
        { clubId: props.clubId, userId: userId as number },
        { skip: !userId }
    );

    const [joinButton, setJoinButton] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const joinClubBtnClickHandler = async () => {
            console.log({ userId: userId as number, clubId: club?.clubId as number });
            try {
                await joinClub({ UserId: userId as number, ClubId: club?.clubId as number }).unwrap();
                refetch();
            } catch (e) {
                console.log(e);
            }
        }

        if ( // case where user is logged in, the user isn't a club member (clubUser doesn't exist), and there isnt a join request already
            status
            && isClubUserError && 'originalStatus' in getClubUserError && getClubUserError.originalStatus === 404
            && isJoinRequestError && 'originalStatus' in getJoinRequestError && getJoinRequestError.originalStatus === 404
        ) {
            setJoinButton(<button onClick={joinClubBtnClickHandler}>Join club</button>);
        } else if ( // case where user is logged in, the user isn't a club member (clubUser doesn't exist), and there is join request already
            status
            && isClubUserError && 'originalStatus' in getClubUserError && getClubUserError.originalStatus === 404
            && !isJoinRequestError
        ) {
            setJoinButton(<button onClick={joinClubBtnClickHandler} disabled>Invitation Sent {joinRequest && joinRequest.clubId} </button>)
        } else if (!status || !getClubUserError) {
            setJoinButton(<></>)
        }
    }, [clubUser, joinRequest, getClubUserError, getJoinRequestError, status, club, userId, joinClub, isClubUserError, isJoinRequestError]);

    return (
        <>
            {joinButton}
        </>
    );
}

export default JoinButton;