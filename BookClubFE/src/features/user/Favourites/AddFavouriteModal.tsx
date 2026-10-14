import { useEffect, useRef } from "react";

function AddFavouriteModal({setShowModal}: {setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
    const modal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close the modal if the user clicks outside of it
        const currentModal = modal.current;

        const handler = (e: MouseEvent) => {
            if (e.target === currentModal) { 
                console.log("sdahbsiudui")
                setShowModal(false);
            }
        }

        currentModal?.addEventListener("click", handler);

        return () => {
            console.log("cleanup")
            currentModal?.removeEventListener("click", handler);
        }

    }, []);

    return (
        <div ref={modal} className="modalBackground modal">
            <div className="addFavouriteModal">
                add fav
            </div>
        </div>
    );
}

export default AddFavouriteModal;