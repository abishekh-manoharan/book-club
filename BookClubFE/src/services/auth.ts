import axios from 'axios';
import { RegistrationFormData } from '../utils/types';

const options = { withCredentials: true };
const BE_URL = import.meta.env.VITE_BE_URL;

const register = (formData: RegistrationFormData) => axios.post(
    BE_URL+"auth/register", 
    formData, 
    {
        'headers': { 'Content-Type': 'application/x-www-form-urlencoded'  }, 
        withCredentials: true
    }
).then(res => res.data);

const login = (username: string, password: string) => axios.post(BE_URL + 'auth/login', { username, password }, options).then(res => res.data);

const logout = () => axios.post(BE_URL + 'auth/logout', options).then(res => res.data);

const status = () => axios.get(BE_URL + 'auth/status', options).then(res => res.data);

export default {
    login,
    logout,
    status,
    register
}