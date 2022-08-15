var bodyparser = require('body-parser');
const admin = require('./firebase_admin');
var axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const productRoute = require('./routes/product-route');
const cartRoute = require('./routes/cart-route');
const clientRoute = require('./routes/client-route');
const { makeAdmin } = require('./utils/makeAdmin');

const express = require('express');
const app = express();
app.use(bodyparser.json({ limit: '100mb' }));
app.use(bodyparser.urlencoded({ limit: '100mb', extended: true }));
app.use(
	cors({
		origin: '*',
	})
);
app.post('/register', async (req, res) => {
	try {
		console.log(req.body);
		const { email, password, username } = req.body;
		admin
			.auth()
			.createUser({ email, password, displayName: username })
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				console.log(user);
				return res.send(user);
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(error);
				return res.send('failed');
			});
	} catch (e) {
		console.log({ e });
		return res.send('failed catch');
	}
});

app.post('/login', async (req, res) => {
	try {
		console.log(req.body);
		const { email, password } = req.body;

		var data = JSON.stringify({
			email,
			password,
			returnSecureToken: true,
		});

		var config = {
			method: 'post',
			url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};

		const response = await axios(config);
		console.log({ response });

		res.status(200).json({ res: response.data });
	} catch (e) {
		console.log({ e: JSON.stringify(e) });
		res.send('failed catch');
	}
});

app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/clients', clientRoute);

app.listen(5000, () => {
	console.log('listening on port 5000');
	// makeAdmin('JG78TPbDOLhdXwzrTuifw9wM3273');
});
