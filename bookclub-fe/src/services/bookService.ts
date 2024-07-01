import axios from "axios";
import { serverURL } from "../constants";
import { BrowseQueryData } from "../types";

export const bookSearch = async (query: string, page: number, limit: number) => {
    if (query && page && limit && query.length > 2) {
        const data: BrowseQueryData = (await axios.get(serverURL + 'book/search/', {
            params: {
                search: query,
                page: page,
                limit: limit
            }
        })).data;

        console.log('data at service:');
        console.log(data);

        return data;
    }
    return { // return an empty dataset when the parameters are invalid
        numFound: 0,
        start: 0,
        numFoundExact: true,
        docs: [],
        num_found: 0,
        q: query,
        offset: null
    };
}