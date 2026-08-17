import React from 'react';

function LandingPage() {

    return (
        <div className="landingPage">
            <div className="header">
                <div className="leftSection">
                    left
                </div>
                <div className="middleSection">
                    <div className="headline">Reading is better<br/>together</div>
                    <div className="subText">
                        features featuresfeatures featuresfeatures featuresfeatures featuresfeatures features
                    </div>
                    <button className="startClubBtn">
                        Start a Club
                    </button>
                    <img src="/src/assets/images/header-images/book.svg"/>
                </div>
                <div className="rightSection">
                    right
                </div>
            </div>
        </div>
    );
}

export default LandingPage;