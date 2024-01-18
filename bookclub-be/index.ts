import express from 'express';
import config from './utils/config';

const app = express();

console.log(config.test);

app.listen();