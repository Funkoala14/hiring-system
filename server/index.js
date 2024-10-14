import app from './app.js';
import connection from './config/connection.js';
import config from './config/config.js';

connection.once('open', () => {
    console.log('MongoDB connected successfully');

    app.listen(config.PORT, () => {
        console.log(`API server running on http://localhost:${config.PORT}`);
    });
});
