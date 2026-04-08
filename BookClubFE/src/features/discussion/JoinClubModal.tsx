interface JoinClubModalProps {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function JoinClubModal({joinClubModalOpen, setJoinClubModalOpen}: JoinClubModalProps) {
    return (
        <>
            {joinClubModalOpen == true ? 
            <div className="modal">
                <div className="deleteModalInner">
                    Join the club to take part in discussions.
                </div>
            </div> :
            <></>}
        </>
    );
}

export default JoinClubModal;