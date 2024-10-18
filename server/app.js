import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routers/UserRouter.js';
import visaStatusRouter from './routers/VisaStatusRouter.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.urlencoded({ extended: true }));

app.use('/v1/api/user', userRouter);
app.use('/v1/api/visa', visaStatusRouter);

app.all('*', (_req, res) => {
    return res.status(404).json({ message: 'API Not Found' });
});

export default app;
