const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const apiRouter = require('./api/api');
const connectDB = require('./config/db');
const connectFirebase = require('./config/auth');
const admin = require('firebase-admin');
const firebase = require('firebase/app');
const testRouter = require('./routes/test.routes');
require('firebase/auth');

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

// DB Connection
connectDB();

connectFirebase();

// const email = 'aaa@aaa.com';
// const password = 'coco12345';

// firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         // Signed in
//         var user = userCredential.user;
//         console.log(user);
//         // ...
//     })
//     .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//         // ..
//     });

app.get('/', async (req, res) => {
    res.status(200).send('Server working');
});

// API Router
app.use('/api', apiRouter);

// Test Router
if (process.env.NODE_ENV === 'test') {
    app.use('/test', testRouter);
}

app.listen(PORT, () => {
    console.log(
        `Server running on port: ${PORT}...\n\n   http://localhost:${PORT}\n\n\n   http://192.168.0.10:${PORT}\n\n\n   Environment: ${process.env.NODE_ENV}\n\n`
    );
});

module.exports = app;
