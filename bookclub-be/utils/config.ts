import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const OPEN_LIBRARY_SEARCH_URL = process.env.OPEN_LIBRARY_SEARCH_URL;
const OPEN_LIBRARY_SEARCH_URL_FIELDS = process.env.OPEN_LIBRARY_SEARCH_URL_FIELDS;

export default {
    DATABASE_URL, 
    PORT,
    OPEN_LIBRARY_SEARCH_URL,
    OPEN_LIBRARY_SEARCH_URL_FIELDS
};