import express from 'express';
// TODO: express-async-errors
import BookRouter from './routes/book';
import config from './utils/config';

const app = express();

app.use('/book', BookRouter);

app.listen(config.PORT);

