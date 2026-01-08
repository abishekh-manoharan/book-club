import React, { useEffect, useState } from 'react';

function ProgressBar({ progress, progressTotal, progresstypeId }: { progress: number | undefined, progressTotal: number | undefined, progresstypeId: number | undefined }) {
    const [width, setWidth] = useState(0);
    const barStyle = {
        width: `${width}%`
    }

    useEffect(() => {
        if (progresstypeId === 1 || progresstypeId === 2 && progressTotal && progress) { // case where progress is measured in pages or chapters
            setWidth(progress! / progressTotal! * 100);
        }
        else if (progresstypeId === 3 && progress) { // case where progress is measured in percentages
            setWidth(progress);
        }
    }, [setWidth, progress, progressTotal, progresstypeId]);

    return (
        <div className='barContainer'>
            <div className='bar' style={barStyle} />
            <div className='barFull' />
        </div>
    );
}

export default ProgressBar;

