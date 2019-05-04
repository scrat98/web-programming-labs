import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config';
import api from './api';

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/documents', api);

mongoose
    .connect(process.env.DATABASE_URL || config.db, {
        useNewUrlParser: true,
    })
    .then(
        () => debug('Successfully connected to mongodb'),
        () => debug('Unable connect to mongodb'),
    );

app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`));
