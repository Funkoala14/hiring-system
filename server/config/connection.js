import mongoose from 'mongoose';
import config from './config.js';

const { MONGO_URI } = config;

mongoose.set('strictQuery', false);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));

export default mongoose.connection;
