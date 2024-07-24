import axios from 'axios';

const options = { withCredentials: true };
const BE_URL = import.meta.env.VITE_BE_URL;

const login = (username: string, password: string) => axios.post(BE_URL + 'auth/login', { username, password }, options).then(res => res.data);

const logout = () => axios.post(BE_URL + 'auth/logout', options).then(res => res.data);

const status = () => axios.get(BE_URL + 'auth/status', options).then(res => res.data);

export default {
    login,
    logout,
    status
}