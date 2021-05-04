const admin = require('firebase-admin');

exports.authUser = async (req, res, next) => {
    try {
        const { email, password, userName } = req.body.signup;

        if (!email | !password | !userName) {
            return res.status(400).json({ error: 'Missing fields' });
        } else {
            const response = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            // console.log(response.user.uid);
            req.uid = response.user.uid;
            req.token = response.user.refreshToken;

            next();
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        next(err);
    }
};

exports.verifyToken = async (req, res, next) => {
    try {
        const { token } = req.body;

        const response = await admin.auth().verifyIdToken(token);
        req.uid = response.uid;
        next();
        // res.status(201).json(response);
    } catch (err) {
        console.log(`Error: ${err}`);
        next(err);
    }
};
