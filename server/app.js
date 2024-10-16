import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routers/UserRouter.js';
import employeeRouter from './routers/EmployeeRouter.js';
import newUserRouter from './routers/NewUserRouter.js';
import dotenv from 'dotenv';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000',  // Allow only your frontend origin
    credentials: true,  // Allow credentials (cookies)
}));

app.use(cookieParser());
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms'));

app.use('/v1/api/user', userRouter);
app.use('/v1/api/employee', employeeRouter);

app.all('*', (_req, res) => {
    return res.status(404).json({ message: 'API Not Found' });
});

export default app;
