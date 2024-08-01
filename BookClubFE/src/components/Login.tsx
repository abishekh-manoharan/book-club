import { useState } from "react";
import AuthService from "../services/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmitClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        AuthService.login(email, password).then(res => console.log(res));
    }
    return (
        <div>
            <form className="form loginForm">
                <label htmlFor="Email">Email</label>
                <input name="Email" id="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required /><br />

                <p className="emailError hidden" style={{ "color": "red" }}>Email is already taken.</p>
                <button onClick={loginSubmitClick}>Submit</button>
            </form>
        </div>
    );
}

export default Login;