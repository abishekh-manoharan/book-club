import express from 'express';
// TODO: express-async-errors
import BookRouter from './routes/book';
import config from './utils/config';
import { log } from './utils/logger';
import cors from 'cors';

const app = express();
app.use(cors());

app.use('/book', BookRouter);

app.listen(config.PORT, () => {
    log(`listening at port: ${config.PORT}`)
});

