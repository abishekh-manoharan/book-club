

function ErrorMsg(props: {msg: string}) {
    
    return (
        <div className="errorMsg">
            {props.msg}
        </div>
    );
}

export default ErrorMsg;