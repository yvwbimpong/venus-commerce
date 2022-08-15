const admin = require('../firebase_admin');
const express = require('express');
const { getAuthStatus } = require('../middlewares/authentication');
const router = express.Router();
const { body } = require('express-validator');
const {
	createProductHelper,
	updateProductHelper,
} = require('../helpers/products');
const { addToCartHelper } = require('../helpers/cart');

router.get('/', getAuthStatus, async (req, res) => {
	const { authId } = req;
	const products = await admin.database().ref(`/carts/${authId}`).once('value');
	const cartList = [];

	products.forEach((child) => {
		const product = child.val();
		const id = child.key;

		cartList.push({
			...product,
			id,
		});
	});

	console.log({ cartList });
	return res.status(200).json([...cartList]);
});

router.post(
	'/',
	getAuthStatus,
	body('id').exists(),
	body('name').exists(),
	body('price').exists(),
	body('description').exists(),
	body('quantity').exists(),
	body('image').exists(),
	addToCartHelper
);

// router.get('/:id', async (req, res) => {
// 	const product = await admin
// 		.database()
// 		.ref(`/products/${req.params.id}`)
// 		.once('value');

// 	return res.status(200).json({ ...product.val() });
// 	// .json({ ['fetch_existing_product']: req.params, product });
// });

// router.patch('/:id', getAuthStatus, updateProductHelper);

// router.delete('/:id', getAuthStatus, async (req, res) => {
// 	const product = await admin
// 		.database()
// 		.ref(`/products/${req.params.id}`)
// 		.remove();
// 	return res
// 		.status(200)
// 		.json({ ['delete_existing_product']: req.params, product });
// });

module.exports = router;
