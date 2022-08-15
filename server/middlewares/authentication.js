const admin = require('../firebase_admin');

const getAuthToken = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		req.authToken = req.headers.authorization.split(' ')[1];
	} else {
		req.authToken = null;
	}
	next();
};

const getAuthStatus = (req, res, next) => {
	getAuthToken(req, res, async () => {
		try {
			const { authToken } = req;
			console.log({authToken})
			const userInfo = await admin.auth().verifyIdToken(authToken);
			console.log({userInfo})
			req.authId = userInfo.uid;
			req.admin = userInfo.admin
			return next();
		} catch (e) {
			return res
				.status(401)
				.send({ error: 'You are not authorized to make this request' });
		}
	});
};

module.exports = {
	getAuthStatus
}
