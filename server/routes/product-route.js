const admin = require('../firebase_admin');
const express = require('express');
const { getAuthStatus } = require('../middlewares/authentication');
const router = express.Router();
const { body } = require('express-validator');
const {
	createProductHelper,
	updateProductHelper,
} = require('../helpers/products');

router.get('/', async (req, res) => {
	const products = await admin.database().ref(`/products`).once('value');
	const productList = [];

	products.forEach((child) => {
		const product = child.val();
		const id = child.key;

		productList.push({
			...product,
			id,
		});
	});

	console.log({ productList });
	return res.status(200).json([...productList]);
});

router.post(
	'/',
	getAuthStatus,
	body('name').exists(),
	body('price').exists(),
	body('description').exists(),
	body('quantity').exists(),
	body('image_base64Obj').exists(),
	body('image_base64Obj.fileName').exists(),
	body('image_base64Obj.base64').exists(),
	createProductHelper
);

router.get('/:id', async (req, res) => {
	const product = await admin
		.database()
		.ref(`/products/${req.params.id}`)
		.once('value');

	return res.status(200).json({ ...product.val() });
	// .json({ ['fetch_existing_product']: req.params, product });
});

router.patch('/:id', getAuthStatus, updateProductHelper);

router.delete('/:id', getAuthStatus, async (req, res) => {
	const product = await admin
		.database()
		.ref(`/products/${req.params.id}`)
		.remove();
	return res
		.status(200)
		.json({ ['delete_existing_product']: req.params, product });
});

module.exports = router;
