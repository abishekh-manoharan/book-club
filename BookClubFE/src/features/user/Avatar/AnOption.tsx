import React from 'react';
import { Properties } from './Create';

interface AnOptionInterface {
    opt: string | {
        url: string;
        header: string;
    },
    setProperties: React.Dispatch<React.SetStateAction<Properties>>,
    propertyType: "bodyVariant" | "eyesVariant" | "mouthVariant" | "topVariant" | "bodyColor" | "background"
}

function AnOption({ opt, setProperties, propertyType }: AnOptionInterface) {
    const isObject = typeof opt === 'object';

    const clickOptionHandler = () => {
        const value = isObject ? opt.header : opt;
        setProperties(prev => ({...prev, [propertyType]: value.toLowerCase()}))
    }

    return <div onClick={clickOptionHandler} className="option">
        {isObject && <img src={opt.url} />}
        {isObject ? opt.header : opt}
    </div>;

}

export default AnOption;