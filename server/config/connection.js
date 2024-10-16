import mongoose from 'mongoose';
import config from './config.js';

const { MONGO_URI } = config;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1); // Exit the process if MONGO_URI is missing
}

mongoose.set('strictQuery', false);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));

export default mongoose.connection;
