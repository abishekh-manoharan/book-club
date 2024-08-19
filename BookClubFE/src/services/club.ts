import axios from "axios";
import { Club } from "../utils/types";

const options = {
    'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
};

const BE_URL = import.meta.env.VITE_BE_URL+'club/';

const createClub = (club: Club) => {
    return axios.post(BE_URL + "create", club, options).then(res => res.data);
}

export default {
    createClub
};