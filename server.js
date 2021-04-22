const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const apiRouter = require('./api/api');

// dotenv config
dotenv.config({ path: './config/.env' });

// server
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// development environment config
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', async (req, res) => {
    res.status(200).send('Server working');
});

// API Router
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(
        `Server running on port: ${PORT}...\n\n   http://localhost:${PORT}\n\n\n   http://192.168.0.10:${PORT}\n\n\n   Node_Env: ${process.env.NODE_ENV}`
    );
});

module.exports = app;
