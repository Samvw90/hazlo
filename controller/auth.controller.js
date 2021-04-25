const firebase = require('firebase/app');
require('firebase/auth');

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
