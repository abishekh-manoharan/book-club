import React from 'react';

function PinnedClubThreadHeader() {
    return (
        <div className="pinnedClubThreadsHeader">
            <img className="thumbtack-icon" src="/src/assets/images/thumbtack-svgrepo-com.svg"/>
            <div style={{"fontWeight":"500", "fontSize":"14px"}}>Pinned Message</div>
        </div>
    );
}

export default PinnedClubThreadHeader;