import { useEffect, useRef } from "react";

interface JoinClubModalProps {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function JoinClubModal({ joinClubModalOpen, setJoinClubModalOpen }: JoinClubModalProps) {
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

    return (
        <div ref={modal} className="modal">
            <div className="deleteModalInner">
                Join the club to take part in discussions.
            </div>
        </div>
    );
}

export default JoinClubModal;