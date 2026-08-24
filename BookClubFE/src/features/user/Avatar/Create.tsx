import { useEffect, useState } from "react";
import data from "./optionInfo.json";
import PropertySection from "./propertySection";

export interface Properties {
    bodyVariant: string,
    eyesVariant: string,
    mouthVariant: string,
    topVariant: string,
    bodyColor: string,
    background: string
}

export interface PropertiesCollection {
    bodyVariant: { url: string, header: string }[],
    eyesVariant: { url: string, header: string }[],
    mouthVariant: { url: string, header: string }[],
    topVariant: { url: string, header: string }[],
    bodyColor: string[],
    background: string[]
}

function CreateAvatar() {
    const [properties, setProperties] = useState<Properties>({
        bodyVariant: "bell",
        eyesVariant: "big",
        mouthVariant: "laugh",
        topVariant: "antennae",
        bodyColor: "d99277",
        background: "f9ecc9"
    });

    const [url, setURL] = useState("");

    useEffect(() => {
        const url = `https://api.dicebear.com/10.x/clay/svg?size=20&animationVariant=&bodyVariant=${properties.bodyVariant}&eyesVariant=${properties.eyesVariant}&mouthVariant=${properties.mouthVariant}&patternVariant=&topVariant=${properties.topVariant}&topProbability=100&backgroundColor=${properties.background}&bodyColor=${properties.bodyColor}&seed=Felix`;

        setURL(url)
    }, [properties]);




    return (
        <div className="createAvatar">
                        <div className="outcome">
                <img src={url} />
            </div>
            <div className="properties">
                <div className="section">
                    <PropertySection data={data.bodyVariant} properties={properties} setProperties={setProperties} propertyType="bodyVariant" />
                </div>

                <div className="section">
                    <PropertySection data={data.eyesVariant} properties={properties} setProperties={setProperties} propertyType="eyesVariant" />
                </div>
                <div className="section">
                    <PropertySection data={data.mouthVariant} properties={properties} setProperties={setProperties} propertyType="mouthVariant" />
                </div>
                <div className="section">
                    <PropertySection data={data.topVariant} properties={properties} setProperties={setProperties} propertyType="topVariant" />
                </div>
                <div className="section">
                    Background Colour
                </div>
                <div className="section">
                    Body Colour

                </div>
            </div>

        </div>
    );
}

export default CreateAvatar;