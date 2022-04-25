import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const PORT = 5000;

app.listen(PORT, () => console.log(`Server listenning PORT ${PORT}`));
