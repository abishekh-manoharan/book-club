import { useEffect, useState } from "react";
import data from "./optionInfo.json";
import PropertySection from "./propertySection";

export interface Properties {
    bodyVariant: string,
    eyesVariant: string,
    mouthVariant: string,
    topVariant: string,
    bodyColor: string,
    backgroundColor: string
}

export interface PropertiesCollection {
    bodyVariant: { url: string, header: string }[],
    eyesVariant: { url: string, header: string }[],
    mouthVariant: { url: string, header: string }[],
    topVariant: { url: string, header: string }[],
    bodyColor: string[],
    backgroundColor: string[]
}

function CreateAvatar() {
    const [properties, setProperties] = useState<Properties>({
        bodyVariant: "bell",
        eyesVariant: "big",
        mouthVariant: "laugh",
        topVariant: "antennae",
        bodyColor: "d99277",
        backgroundColor: "f9ecc9"
    });

    const [url, setURL] = useState("");

    useEffect(() => {
        const url = `https://api.dicebear.com/10.x/clay/svg?size=20&animationVariant=&bodyVariant=${properties.bodyVariant}&eyesVariant=${properties.eyesVariant}&mouthVariant=${properties.mouthVariant}&patternVariant=&topVariant=${properties.topVariant}&topProbability=100&backgroundColor=${properties.backgroundColor}&bodyColor=${properties.bodyColor}&seed=Felix`;

        setURL(url)
    }, [properties]);




    return (
        <div className="createAvatar">
            <div className="outcome">
                <img src={url} />
            </div>
            <div className="properties">
                <div className="section">
                    <PropertySection data={data.bodyVariant} properties={properties} setProperties={setProperties} propertyType="bodyVariant" header="Body" />
                </div>

                <div className="section">
                    <PropertySection data={data.eyesVariant} properties={properties} setProperties={setProperties} propertyType="eyesVariant" header="Eyes" />
                </div>
                <div className="section">
                    <PropertySection data={data.mouthVariant} properties={properties} setProperties={setProperties} propertyType="mouthVariant" header="Mouth" />
                </div>
                <div className="section">
                    <PropertySection data={data.topVariant} properties={properties} setProperties={setProperties} propertyType="topVariant" header="Top" />
                </div>
                <div className="section">
                    <PropertySection data={data.backgroundColor} properties={properties} setProperties={setProperties} propertyType="backgroundColor" header="Background Colour" />
                </div>
                <div className="section">
                    <PropertySection data={data.bodyColor} properties={properties} setProperties={setProperties} propertyType="bodyColor" header="Body Colour" />
                </div>
            </div>

        </div>
    );
}

export default CreateAvatar;