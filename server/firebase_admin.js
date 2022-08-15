const admin = require('firebase-admin');
var serviceAccount = require('./velo-assessment-firebase-adminsdk-duopp-edc8966d55.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://velo-assessment-default-rtdb.firebaseio.com',
});

module.exports = admin;
