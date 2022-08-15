import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import env from '../../config/env.json';

const config = {
	apiKey: env.REACT_APP_API_KEY,
	authDomain: env.REACT_APP_AUTH_DOMAIN,
	databaseURL: env.REACT_APP_DATABASE_URL,
	projectId: env.REACT_APP_PROJECT_ID,
	storageBucket: env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.database = app.database();
	}

	// *** Auth API ***

	setDisplayName = (displayName) =>
		this.auth.currentUser.updateProfile({ displayName });

	createUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	signInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	signOut = () => this.auth.signOut();

	// Database
	saveUsername = (displayName, email, uid) =>
		this.database.ref(`users/${uid}`).set({ displayName, email });
}

export default Firebase;
