

function ErrorMsg(props: { msg: string }) {
    if (typeof (props.msg) !== "string") {
        return <div className="errorMsg">
            Unknown error occured.
        </div>
    }
    return (
        <div className="errorMsg">
            {props.msg}
        </div>
    );
}

export default ErrorMsg;