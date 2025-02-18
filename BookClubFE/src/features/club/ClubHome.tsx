import React from 'react';
import { useParams } from 'react-router-dom';

function ClubHome() {
    const { id } = useParams();

    return (
        <div>
            <>{ id }</>
        </div>
    );
}

export default ClubHome;