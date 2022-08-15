const admin = require('../firebase_admin');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
	keyFilename: './velo-assessment-firebase-adminsdk-duopp-edc8966d55.json',
});
const storageBucket = storage.bucket(`${process.env.FIREBASE_STORAGE_URL}`);
const { validationResult } = require('express-validator');

const uploadImageToStorage = ({ fileName, base64 }) => {
	return new Promise((resolve, reject) => {
		const stream = require('stream');
		const bufferStream = new stream.PassThrough();
		bufferStream.end(Buffer.from(base64, 'base64'));
		const fullPath = `products/images/${fileName}`;
		const file = storageBucket.file(fullPath);
		const metadata = {
			createdTimestamp: Date.now(),
			systemGenerated: 'false',
			fileType: 'Image',
			fileName: fileName.split('.')[0],
			path: fullPath,
		};
		bufferStream
			.pipe(
				file.createWriteStream({
					metadata: {
						contentType: 'auto',
						metadata,
					},
					predefinedAcl: 'publicRead',
					public: true,
					validation: 'md5',
				})
			)
			.on('error', (err) => {
				console.log('Error Occured');
				console.log(err);
				//reject
				reject({ err });
			})
			.on('finish', async (result) => {
				console.log('File Upload Successfull', { result });
				const publicUrl = await file.publicUrl();
				console.log({ publicUrl });
				//resolve
				resolve(publicUrl);
			});
	});
};

const createProductHelper = async (req, res) => {
	try {
		console.log({
			body: req.body,
			admin: req.admin,
			authId: req.authId,
		});

		if (!req.admin) {
			return res.status(401).json('non admin user detected. permission denied');
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const imageUrl = await uploadImageToStorage(req.body.image_base64Obj);

		admin
			.database()
			.ref(`/products`)
			.push({
				image: imageUrl,
				name: req.body.name,
				price: req.body.price,
				description: req.body.description,
				quantity: req.body.quantity,
			})
			.then((snap) => {
				const key = snap.key;
				return res.status(200).json({
					image: imageUrl,
					name: req.body.name,
					price: req.body.price,
					description: req.body.description,
					quantity: req.body.quantity,
					id: key,
				});
			});

	} catch (error) {
		console.log({ error });
	}
};

const updateProductHelper = async (req, res) => {
	try {
		console.log({
			body: req.body,
			admin: req.admin,
			authId: req.authId,
		});

		if (!req.admin) {
			return res.status(401).json('non admin user detected. permission denied');
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const imageUrl = req.body.image_base64Obj
			? await uploadImageToStorage(req.body.image_base64Obj)
			: null;

		await admin
			.database()
			.ref(`/products/${req.params.id}`)
			.update({
				...(imageUrl && { image: imageUrl }),
				...(req.body.name && { name: req.body.name }),
				...(req.body.description && { description: req.body.description }),
				...(req.body.price && { price: req.body.price }),
				...(req.body.quantity && { quantity: req.body.quantity }),
			});

		return res.status(200).json({ ['update_existing_product']: req.params });
	} catch (error) {
		console.log({ error });
	}
};

module.exports = {
	createProductHelper,
	updateProductHelper,
};
