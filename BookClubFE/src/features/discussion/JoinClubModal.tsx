import { useEffect, useRef } from "react";
import { useJoinClubMutation } from "../club/clubSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useGetUserIdQuery } from "../auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";

interface JoinClubModalProps {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function JoinClubModal({ setJoinClubModalOpen }: JoinClubModalProps) {
    const nav = useNavigate();
    const [joinClub] = useJoinClubMutation();
    const { data: userId } = useGetUserIdQuery();

    const { clubid } = useParams()
    const clubId = Number(clubid);

    const dispatch = useAppDispatch();
    const modal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close the modal if the user clicks outside of it
        const currentModal = modal.current;

        const handler = (e: MouseEvent) => {
            if (e.target === currentModal) {
                setJoinClubModalOpen(false);
            }
        }

        currentModal?.addEventListener("click", handler);

        return () => {
            console.log("cleanup")
            currentModal?.removeEventListener("click", handler);
        }

    }, []);

    const joinClubBtnClickHandler = async () => {
        try {
            if (userId) {
                const result = await joinClub({
                    UserId: userId,
                    ClubId: clubId
                }).unwrap();
                console.log("Success:", result);
            }
            else {
                // const errorMessage = "User must be logged in to join a club.";
                // dispatch(updateErrorMessageThunk(errorMessage));
                nav("/login")
            }
            setJoinClubModalOpen(false);
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
    return (
        <div ref={modal} className="modal">
            <div className="joinClubModalInner">
                <img
                    className="infoLogo"
                    src="/src/assets/images/info.svg"
                />
                <h1 className="warningMain">Club Members Only</h1>
                <div className="warningSub mediumText">Replying is a club member exclusive. Join to start engaging with posts and connect with the community.</div>
                <div className="buttons">
                    <button className="btn" onClick={joinClubBtnClickHandler}>Join Club</button>
                    <button className="btn" onClick={() => { setJoinClubModalOpen(false) }}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default JoinClubModal;