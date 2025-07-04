import React, { useEffect, useState } from 'react';

function ProgressBar({ progress, progressTotal, progresstypeId }: { progress: number | undefined, progressTotal: number | undefined, progresstypeId: number | undefined }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (progresstypeId === 1 || progresstypeId === 2 && progressTotal && progress) { // case where progress is measured in pages or chapters
            setWidth(progress! / progressTotal! * 100);
        }
    }, [setWidth, progress, progressTotal, progresstypeId]);
    //  else if (progresstypeId === 2) { // case where progress is measured in chapters

    // } else if ( progresstypeId === 3) { // case where progress is measured in percentages

    // }

return (
        <div className='barContainer'>
            <hr className='bar' />
        </div>
    );
}

export default ProgressBar;