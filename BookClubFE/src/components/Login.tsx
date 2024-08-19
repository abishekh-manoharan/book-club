import { useState } from "react";
import AuthService from "../services/auth";
import { GetAuthContext } from "../utils/context";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = GetAuthContext();

    const loginSubmitClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        AuthService.login(email, password).then(res => {
            console.log("login res");
            console.log(res);
            
            if (res.$values[0] === 'succeeded') {
                // displaying success message
                document.querySelector('.loginSuccess')?.classList.remove('hidden');
                document.querySelector('.loginError')?.classList.add('hidden');
                // updating the auth state using context
                auth.setAuth(true);
                nav('/');
            } else {
                document.querySelector('.loginSuccess')?.classList.add('hidden');
                document.querySelector('.loginError')?.classList.remove('hidden');
            }
            
        }
        );
        // HANDLING LOGIN RESPONSE
    }

    return (
        <div>
            <form className="form loginForm">
                <label htmlFor="Email">Email</label>
                <input name="Email" id="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required /><br />

                <p className="loginError hidden" style={{ "color": "red" }}>Email or password incorrect</p>
                <p className="loginSuccess hidden" style={{ "color": "green" }}>Login successful</p>
                <button onClick={loginSubmitClick}>Submit</button>
            </form>
        </div>
    );
}

export default Login;