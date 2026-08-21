import data from "./optionInfo.json";

function CreateAvatar() {
    return (
        <div className="createAvatar">
            <div className="properties">
                <div className="body section">
                    <div className="optionHeader">
                        Body
                    </div>s
                    <div className="options">
                        {
                            data.body.map((opt) => {
                                return <div className="option">
                                    <img src={opt.url} />
                                    {opt.header}
                                </div>;
                            })
                        }
                    </div>
                </div>
                <div className="body section">
                    Body Colour
                    {
                        // data.bodyColour.map((opt) => {
                        //     return <div className="option">
                        //     </div>;
                        // })
                    }
                </div>
                <div className="body section">
                    Eyes
                </div>
                <div className="body section">
                    Mouth
                </div>
                <div className="body section">
                    Top
                </div>
                <div className="body section">
                    Background Colour
                </div>
            </div>
            <div className="outcome">
                outcome
            </div>
        </div>
    );
}

export default CreateAvatar;