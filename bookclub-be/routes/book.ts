import express from 'express';
import pg from 'pg';
import { Pool } from 'pg';

const pool = new Pool();

const BookRouter = express.Router();

BookRouter.get('/', (_req, res) => {
    res.send('helloworld');
});

export default BookRouter;

