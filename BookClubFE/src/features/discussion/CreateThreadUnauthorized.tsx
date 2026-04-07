import React from 'react';

function CreateThreadUnauthorized() {
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
                    <a href=""className="infoLogo">
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