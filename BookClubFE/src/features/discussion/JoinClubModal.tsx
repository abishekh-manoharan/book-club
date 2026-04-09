import { useEffect, useRef } from "react";

interface JoinClubModalProps {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function JoinClubModal({ joinClubModalOpen, setJoinClubModalOpen }: JoinClubModalProps) {
    const modal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close the modal if the user clicks outside of it

        const handler = (e: MouseEvent) => {
            if (e.target === modal.current) {
                setJoinClubModalOpen(false);
            }
        }

        modal.current?.addEventListener("click", handler);

        return () => {
            modal.current?.removeEventListener("click", handler);
        }
    }, [joinClubModalOpen, setJoinClubModalOpen]);

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