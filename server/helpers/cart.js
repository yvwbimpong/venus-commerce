const admin = require('../firebase_admin');
const { validationResult } = require('express-validator');

const addToCartHelper = async (req, res) => {
	try {
		const { authId } = req;
		const { name, description, quantity, id, price, image } = req.body;
		console.log({
			body: req.body,
			admin: req.admin,
			authId: req.authId,
		});

		// if (!req.admin) {
		// 	return res.status(401).json('non admin user detected. permission denied');
		// }

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		admin.database().ref(`/carts/${authId}/${id}`).set({
			image,
			name,
			price,
			description,
			quantity,
		});

		return res.status(200).json('successfully added to cart');
	} catch (error) {
		console.log({ error });
		return res.status(500).json('something went wrong');
	}
};

module.exports = {
	addToCartHelper,
};
