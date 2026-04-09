import { useEffect, useRef } from "react";

interface JoinClubModalProps {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function JoinClubModal({joinClubModalOpen, setJoinClubModalOpen}: JoinClubModalProps) {
    const modal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close the modal if the user clicks outside of it
        modal.current?.addEventListener("click", (e) => { 
            if (e.target === modal.current) {
                setJoinClubModalOpen(false);
            }
        });
    }, [joinClubModalOpen]);

    return (
        <>
            {joinClubModalOpen == true ? 
            <div ref={modal} className="modal">
                <div className="deleteModalInner">
                    Join the club to take part in discussions.
                </div>
            </div> :
            <></>}
        </>
    );
}

export default JoinClubModal;