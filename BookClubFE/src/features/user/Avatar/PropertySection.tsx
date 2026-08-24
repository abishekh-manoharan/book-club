import React from 'react';
import { Properties } from './Create';
import AnOption from './AnOption';

interface PropertySectionInterface {
    properties: Properties,
    setProperties: React.Dispatch<React.SetStateAction<Properties>>,
    propertyType: "bodyVariant" | "eyesVariant" | "mouthVariant" | "topVariant" | "bodyColor" | "backgroundColor",
    data: { url: string, header: string }[] | string[],
    header: string
}

function PropertySection(props: PropertySectionInterface) {
    return (
        <>
            <div className="optionHeader">
                {props.header}
            </div>
            <div className="options">
                {
                    props.data.map((opt) => <AnOption opt={opt} setProperties={props.setProperties} propertyType={props.propertyType} />)
                }
            </div>

            {/* <div className="button" onClick={() => {
                props.setProperties((prev)=> ({...prev, [props.propertyType]: "boulder"}))
            }}>button</div> */}
        </>

    );
}

export default PropertySection;