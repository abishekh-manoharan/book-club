import React from 'react';
interface CreateThreadUnauthorizedProps {
    joinClubModalOpen: boolean,
    setJoinClubModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateThreadUnauthorized({ setJoinClubModalOpen }: CreateThreadUnauthorizedProps) {
    const clickInfoLogo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setJoinClubModalOpen(true);
    }

    return (
        <div className="createThreadUnauthorized">
            <div className="discussionPostThreadForm">
                <div className="pfpAndText">
                    <textarea
                        className="discussionCreateThreadTextArea"
                        placeholder="Join the conversation"
                        style={{ lineHeight: ".6em" }}
                        required
                        disabled
                    />
                    <a onClick={e=>clickInfoLogo(e)} href="" className="infoLogo">
                        <img
                            className="infoLogo"
                            src="/src/assets/images/info.svg"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CreateThreadUnauthorized;