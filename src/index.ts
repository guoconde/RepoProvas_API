import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import router from './routers/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorMiddleware);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server listenning PORT ${PORT}`));
