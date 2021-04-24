const admin = require('firebase-admin');
const firebase = require('firebase/app');

const connectFirebase = () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            const firebaseConfig = {
                apiKey: process.env.FIREBASE_API_KEY_TEST,
                authDomain: process.env.FIREBASE_AUTH_DOMAIN_TEST,
                projectId: process.env.FIREBASE_PROJECT_ID_TEST,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET_TEST,
                messagingSenderId:
                    process.env.FIREBASE_MESSAGING_SENDER_ID_TEST,
                appId: process.env.FIREBASE_APP_ID_TEST,
            };

            firebase.initializeApp(firebaseConfig);

            admin.initializeApp({
                credential: admin.credential.cert(
                    JSON.parse(process.env.FIREBASE_ADMIN_TEST)
                ),
            });
        } else {
            const firebaseConfig = {
                apiKey: process.env.FIREBASE_API_KEY,
                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                projectId: process.env.FIREBASE_PROJECT_ID,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.FIREBASE_APP_ID,
                measurementId: process.env.FIREBASE_MEASUREMENT_ID,
            };

            firebase.initializeApp(firebaseConfig);

            admin.initializeApp({
                credential: admin.credential.cert(
                    JSON.parse(process.env.FIREBASE_ADMIN)
                ),
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        process.exit(1);
    }
};

module.exports = connectFirebase;
