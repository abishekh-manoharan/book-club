import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authSlice";


function Login() {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const auth = GetAuthContext();
    const [login, { isLoading }] = useLoginMutation();

    const loginSubmitClick = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const res = await login({ email, password }).unwrap();
            console.log('success res')
            console.log(res)
            document.querySelector('.loginSuccess')?.classList.remove('hidden');
            document.querySelector('.loginError')?.classList.add('hidden');
            nav('/')
        } catch (e) {
            if (e && typeof e === 'object') {
                if ('status' in e) console.log('e.status')
                if ('status' in e) console.log(e.status)
                if ('data' in e) console.log('e.data')
                if ('data' in e) console.log(e.data)
                if ('error' in e) console.log('e.error')
                if ('error' in e) console.log(e.error)
            }
            document.querySelector('.loginSuccess')?.classList.add('hidden');
            document.querySelector('.loginError')?.classList.remove('hidden');
        }
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
                <button onClick={loginSubmitClick} disabled={isLoading}>Submit</button>
            </form>
        </div>
    );
}

export default Login;