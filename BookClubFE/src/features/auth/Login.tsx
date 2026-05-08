import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authSlice";


function Login({ status }: { status: boolean | undefined }) {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const auth = GetAuthContext();
    const [login, { isLoading }] = useLoginMutation();
    const formRef = useRef<HTMLFormElement>();

    if (status) {
        nav('/');
        return;
    }

    const loginSubmitClick = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // checking for validity - particularly requirement
        const loginForm = formRef.current as HTMLFormElement;
        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }

        try {
            const res = await login({ email, password }).unwrap();
            console.log('success res')
            console.log(res)
            document.querySelector('.loginSuccess')?.classList.remove('hidden');
            document.querySelector('.loginError')?.classList.add('hidden');
            nav(-1)
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

    const registerPageNavBtnClickHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();

        nav("../register")
    }

    return (
        <div className="createClubPage">
            <div className="loginHeader createClubHeading">
                <h1>Sign in to BookClub</h1>
            </div>
            <form ref={formRef} className="form loginForm createMeetingForm">
                <label htmlFor="Email">Email</label>
                <input className="textInput" name="Email" id="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />

                <label htmlFor="password">Password</label>
                <input className="textInput" type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required /><br />

                <p className="loginError hidden" style={{ "color": "red" }}>Email or password incorrect</p>
                <p className="loginSuccess hidden" style={{ "color": "green" }}>Login successful</p>
                <button className="button" onClick={loginSubmitClick} disabled={isLoading}>Sign In</button><br />
                <div className="mediumText textAlignCenter">New here? <a href="" onClick={registerPageNavBtnClickHandler}> Create an account.</a></div>
            </form>
        </div>
    );
}

export default Login;