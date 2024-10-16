const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    
    
};
console.log('process.env.MONGO_URI', process.env.MONGO_URI);
export default config;
