import React from 'react';
import { Properties } from './Create';

interface AnOptionInterface {
    opt: string | {
        url: string;
        header: string;
    },
    setProperties: React.Dispatch<React.SetStateAction<Properties>>,
    propertyType: "bodyVariant" | "eyesVariant" | "mouthVariant" | "topVariant" | "bodyColor" | "backgroundColor"
}

function AnOption({ opt, setProperties, propertyType }: AnOptionInterface) {
    const isObject = typeof opt === 'object';

    const clickOptionHandler = () => {
        const value = isObject ? opt.header : opt;
        setProperties(prev => ({ ...prev, [propertyType]: value.toLowerCase() }))
    }

    const clickColourOptionHandler = () => {
        const value = isObject ? opt.header : opt;
        setProperties(prev => ({ ...prev, [propertyType]: value.toLowerCase() }))
    }

    if (propertyType !== "bodyColor" && propertyType !== "backgroundColor") {
        return <div onClick={clickOptionHandler} className="option">
            {isObject && <img src={opt.url} />}
            {isObject ? opt.header : opt}
        </div>;
    }

    return <div onClick={clickColourOptionHandler} className="option">
        {<div className='colourOption' style={{ backgroundColor: "#"+opt }} />}
    </div>;

}

export default AnOption;