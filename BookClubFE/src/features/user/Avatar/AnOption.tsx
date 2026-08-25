import React from 'react';
import { Properties } from './Create';

interface AnOptionInterface {
    opt: string | {
        url: string;
        header: string;
    },
    properties: Properties,
    setProperties: React.Dispatch<React.SetStateAction<Properties>>,
    propertyType: "bodyVariant" | "eyesVariant" | "mouthVariant" | "topVariant" | "bodyColor" | "backgroundColor"
}

function AnOption({ opt, properties, setProperties, propertyType }: AnOptionInterface) {
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
    console.log(opt);
    if (opt === "custom") {
        return <input
            type="color"
            value={"#" + properties[propertyType]}
            onChange={(event) => {
                console.log(event.target.value);
                setProperties(prev => ({
                    ...prev,
                    [propertyType]: event.target.value.slice(1)
                }));
            }}
        />
    }
    return <div onClick={clickColourOptionHandler} className="option">
        {<div className='colourOption' style={{ backgroundColor: "#" + opt }} />}
    </div>;

}

export default AnOption;