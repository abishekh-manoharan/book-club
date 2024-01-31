import express from 'express';
import { bookSearchController } from '../controllers/book';
import { log } from '../utils/logger';
import { BrowseQueryData } from '../types';

const BookRouter = express.Router();

BookRouter.get('/search', async (req, res) => {
    const search = req.query.search;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    if(search && page && limit && typeof(search) === 'string' && !isNaN(page) && !isNaN(limit)) {
        const data: BrowseQueryData = await bookSearchController(search, page, limit)
        return res.json(data);
    }

    return res.status(404).send('invalid search');
});

export default BookRouter;

