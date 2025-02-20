import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClubQuery } from './clubSlice';

function ClubHome() {
    const { id } = useParams();
    const clubId = Number(id);
    
    const { data: club, isError, isLoading } = useGetClubQuery(clubId);

    if(isError) {
        return <>Not Found</>
    }
    
    return (
        <div>
            <>{ club?.name }</>
            {isLoading && 'loading'}
        </div>
    );
}

export default ClubHome;