import { useEffect, useState } from "react";
import data from "./optionInfo.json";
import { useSetProfilePictureMutation } from "../../../features/auth/authSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../../app/typeGuards";
import { updateErrorMessageThunk } from "../../error/errorSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
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
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const [setProfilePicture] = useSetProfilePictureMutation();

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


    const createButtonClickHandler = async () => {
        try {
            await setProfilePicture({Url: url}).unwrap();
            nav('/clubs')
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                dispatch(updateErrorMessageThunk("Unknown error occured."));
            }
        }
    }

    return (
        <div className="createAvatar">
            <div className="outcome">
                <img src={url} />
            </div>
            <div className="propertiesAndHeaderContainer">
                <div className="header">
                    <h1>Create your avatar</h1>
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
                        {/* <input
                        type="color"
                        value={"#" + properties.bodyColor}
                        onChange={(event) => {
                            console.log(event.target.value);
                            setProperties(prev => ({
                                ...prev,
                                bodyColor: event.target.value.slice(1)
                            }));
                        }}
                    /> */}
                        {/* <input type="text" value={"#" + properties.bodyColor} onChange={(event) => {
                        setProperties(prev => ({
                            ...prev,
                            bodyColor: event.target.value
                        }))
                    }}/> */}
                    </div>
                    <button className="createBtn">
                        <h1 onClick={createButtonClickHandler}>Create</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateAvatar;