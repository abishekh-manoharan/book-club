import { useState } from "react";
import { RegistrationFormData } from "../utils/types";
import AuthService from '../services/auth';
import { AxiosError } from "axios";

function Register() {
    const [username, setUsername] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');


    const submitButtonHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // checking for validity - particularly requirement
        const registrationForm = document.querySelector(".registrationForm") as HTMLSelectElement;
        if(!registrationForm.checkValidity()) {
            registrationForm.reportValidity();
            return;
        }

        const registrationData: RegistrationFormData = {
            Username: username,
            Fname: fName,
            LName: lName,
            Email: email,
            password: password
        }
        
        AuthService.register(registrationData)
            .then(res => console.log(res))
            .catch(e => {
                if(e instanceof AxiosError) {
                    console.log(e.message);
                }
            });

        console.log('submit button clicked')
    }
    
    return (
        <div>
            <form className="form registrationForm">
                <label htmlFor="Username">Username</label>
                <input value="amano" name="Username" id="Username" onChange={(e) => {setUsername(e.target.value)}} required/><br/>
                <label htmlFor="FName">First Name</label>
                <input value="abi" name="Fname" id="Fname" onChange={(e) => {setFName(e.target.value)}} required/>
                <label htmlFor="LName">Last Name</label>
                <input value="mano" name="LName" id="LName" onChange={(e) => {setLName(e.target.value)}} required/><br/>
                <label htmlFor="Email">Email</label>
                <input value="abi@gmaaail.com" name="Email" id="Email" onChange={(e) => {setEmail(e.target.value)}} required/><br/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} required/><br/>
                {/* <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => {setConfirmPassword(e.target.value)}} required/><br/> */}

                <button onClick={submitButtonHandler}>Sign Up</button>
            </form>
        </div>
    );
}

export default Register;