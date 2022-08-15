const admin = require('../firebase_admin');

const getClients = async (req, res) => {
	if (!req.admin) {
		return res.status(401).json('non admin user detected. permission denied');
	}

	const clients = await admin.database().ref(`/users`).once('value');
	const clientList = [];

	clients.forEach((child) => {
		const product = child.val();
		const id = child.key;

		clientList.push({
			...product,
			id,
		});
	});

	console.log({ clientList });
	return res.status(200).json([...clientList]);
};

module.exports = {
	getClients,
};
