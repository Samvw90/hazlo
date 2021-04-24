const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(
            process.env.NODE_ENV === 'test'
                ? process.env.TEST_MONGO_URI
                : process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        );

        console.log(
            `Mongo DB connected: ${connectionDB.connection.host}/${connectionDB.connection.name}`
        );
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
