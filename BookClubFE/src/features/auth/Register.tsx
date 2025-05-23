import React, { useEffect, useState } from "react";
import { RegistrationFormData } from "../../utils/types";
// import AuthService from '../services/auth';
// import { AxiosError } from "axios";
import { useRegisterMutation, RegistrationSuccess } from "./authSlice";
import { isRegistrationAllowanceError } from "../../app/typeGuards";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("Abcde123!");
    const [confirmPassword, setConfirmPassword] = useState("Abcde123!");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const nav = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    // check if passwords match on password and confirmPassword state changes
    useEffect(() => {
        if (confirmPassword !== password) {
            document.querySelector(".PasswordsMatch")?.classList.remove("hidden");
            setPasswordsMatch(false);
            return;
        }
        document.querySelector(".PasswordsMatch")?.classList.add("hidden");
        setPasswordsMatch(true);
    }, [password, confirmPassword])

    const submitButtonHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // checking for validity - particularly requirement
        const registrationForm = document.querySelector(".registrationForm") as HTMLSelectElement;
        if (!registrationForm.checkValidity()) {
            registrationForm.reportValidity();
            return;
        }

        // ensuring that password and confirm-password fields match before attempting to register
        if (!passwordsMatch) {
            return;
        }

        const registrationData: RegistrationFormData = {
            Username: username,
            Fname: fName,
            LName: lName,
            Email: email,
            password: password
        }

        // resetting error messages
        const errorElement = document.querySelector(".PasswordTooShort");
        if (!errorElement?.classList.contains("hidden")) { // display only if 
            errorElement!.classList.toggle('hidden');
        }
        const errorElement2 = document.querySelector(".PasswordRequiresNonAlphanumeric");
        if (!errorElement2?.classList.contains("hidden")) { // display only if 
            errorElement2!.classList.toggle('hidden');
        }
        const errorElement3 = document.querySelector(".PasswordRequiresLower");
        if (!errorElement3?.classList.contains("hidden")) { // display only if 
            errorElement3!.classList.toggle('hidden');
        }
        const errorElement4 = document.querySelector(".PasswordRequiresUpper");
        if (!errorElement4?.classList.contains("hidden")) { // display only if 
            errorElement4!.classList.toggle('hidden');
        }
        const errorElement5 = document.querySelector(".PasswordRequiresDigit");
        if (!errorElement5?.classList.contains("hidden")) { // display only if 
            errorElement5!.classList.toggle('hidden');
        }
        const errorElement6 = document.querySelector(".DuplicateUserName");
        if (!errorElement6?.classList.contains("hidden")) { // display only if 
            errorElement6!.classList.toggle('hidden');
        }
        const errorElement7 = document.querySelector(".DuplicateEmail");
        if (!errorElement7?.classList.contains("hidden")) { // display only if 
            errorElement7!.classList.toggle('hidden');
        }


        try {
            const unTypedResponse = await register(registrationData).unwrap() as unknown;
            const response = unTypedResponse as RegistrationSuccess;

            console.log(response);
            if (response[0] === 'success') {
                console.log('suceeded in effect')
                const submissionSuccessElement = document.querySelector(".submission-success");
                submissionSuccessElement!.classList.toggle("hidden");
                nav('/login');
                return;
            }
            
        } catch (e) {
            if (isRegistrationAllowanceError(e)) {
                console.log("e");
                console.log(e);

                e.errors.forEach((code: string) => {
                    console.log(code)
                    if (code === "PasswordTooShort") {
                        // display error messages
                        const errorElement = document.querySelector(".PasswordTooShort");
                        if (errorElement?.classList.contains("hidden")) { // display only if 
                            errorElement.classList.toggle('hidden');
                        }
                    }
                    if (code === "PasswordRequiresNonAlphanumeric") {
                        // display error messages
                        const errorElement = document.querySelector(".PasswordRequiresNonAlphanumeric");
                        if (errorElement?.classList.contains("hidden")) { // display only if 
                            errorElement.classList.toggle('hidden');
                        }
                    }
                    if (code === "PasswordRequiresLower") {
                        // display error messages
                        const errorElement = document.querySelector(".PasswordRequiresLower");
                        if (errorElement?.classList.contains("hidden")) { // display only if 
                            errorElement.classList.toggle('hidden');
                        }
                    }
                    if (code === "PasswordRequiresUpper") {
                        // display error messages
                        const errorElement = document.querySelector(".PasswordRequiresUpper");
                        if (errorElement?.classList.contains("hidden")) { // display only if 
                            errorElement.classList.toggle('hidden');
                        }
                    }
                    if (code === "PasswordRequiresDigit") {
                        // display error messages
                        const errorElement = document.querySelector(".PasswordRequiresDigit");
                        if (errorElement?.classList.contains("hidden")) { // display only if 
                            errorElement.classList.toggle('hidden');
                        }
                    }
                    if (code === "DuplicateUserName") {
                        // display error messages
                        const errorElement = document.querySelector(".DuplicateUserName");
                        if (errorElement?.classList.contains("hidden")) { // display only if 
                            errorElement.classList.toggle('hidden');
                        }
                    }
                    if (code === "DuplicateEmail") {
                        // display error messages
                        const errorElement = document.querySelector(".DuplicateEmail");
                        if (errorElement?.classList.contains("hidden")) { // display only if 
                            errorElement.classList.toggle('hidden');
                        }
                    }
                })

            } else {
                window.alert("an unknown error occurred. please try again later.")
                if (e instanceof Error) {
                    console.log(e)
                }
            }
        }
    }

    return (
        <div>
            <form className="form registrationForm">
                <label htmlFor="Username">Username</label>
                <input name="Username" id="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} required /><br />
                <p className="DuplicateUserName hidden" style={{ "color": "red" }}>Username is already taken.</p>
                <label htmlFor="FName">First Name</label>
                <input name="Fname" id="Fname" value={fName} onChange={(e) => { setFName(e.target.value) }} required />
                <label htmlFor="LName">Last Name</label>
                <input name="LName" id="LName" value={lName} onChange={(e) => { setLName(e.target.value) }} required /><br />
                <label htmlFor="Email">Email</label>
                <input name="Email" id="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" required /><br />
                <p className="DuplicateEmail hidden" style={{ "color": "red" }}>Email is already taken.</p>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required /><br />
                <p className="PasswordTooShort hidden" style={{ "color": "red" }}>Passwords must be at least 8 characters.</p>
                <p className="PasswordRequiresNonAlphanumeric hidden" style={{ "color": "red" }}>Passwords must have at least one non alphanumeric character.</p>
                <p className="PasswordRequiresDigit hidden" style={{ "color": "red" }}>Passwords must have at least one digit ('0'-'9')</p>
                <p className="PasswordRequiresLower hidden" style={{ "color": "red" }}>Passwords must have at least one lowercase ('a'-'z')</p>
                <p className="PasswordRequiresUpper hidden" style={{ "color": "red" }}>Passwords must have at least one uppercase ('A'-'Z').</p>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required /><br />
                <p className="PasswordsMatch hidden" style={{ "color": "red" }}>Passwords do not match.</p>
                <button onClick={submitButtonHandler} disabled={isLoading}>Sign Up</button>
            </form>
            <p className="submission-success hidden" style={{ "color": "green" }}>Registration successful</p>
        </div>
    );
}

export default Register;