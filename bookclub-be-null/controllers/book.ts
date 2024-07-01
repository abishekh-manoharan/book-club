import config from "../utils/config";
import axios from "axios";
import { log } from "../utils/logger";
import { BrowseQueryData } from "../types";

// takes in the search string, page number, and page limit and responds with the resulting data from the search
export const bookSearchController = async (search: string, page: number = 1, limit: number = 5): Promise<BrowseQueryData> => {
    try { 
        const res = await axios.get(`${config.OPEN_LIBRARY_SEARCH_URL}${search}${config.OPEN_LIBRARY_SEARCH_URL_FIELDS}&page=${page}&limit=${limit}`); 
        return res.data;
    }
    catch (err) {
        console.log('caught err in server');
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          console.log(err.cause);
          console.log(err.name)
        }
        return { // returning "empty" data object if an error occurs in search
            numFound: 0,
            start: 0,
            numFoundExact: true,
            docs: [],
            num_found: 0,
            q: search,
            offset: null,
        };
    }
}