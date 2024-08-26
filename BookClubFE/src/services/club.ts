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

const getJoinedClubs = () => {
    return axios.get(BE_URL + "joinedClubs", { withCredentials: true }).then(res => res.data.$values);
}

const getSearchResults = (query: string) => {
    // case where no value is entered
    if(query === undefined ||query === null || query === "") {
        return new Promise((_resolve, reject) => reject("no query value"));
    }
    
    return axios.get(BE_URL + "getSearchResults/" + query, {
        "data": {query: query},
        ...options
    }).then(res => res.data.$values);
}

export default {
    createClub,
    getJoinedClubs,
    getSearchResults
};