const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
	name: 'mail.cargodeliveries',
	host: 'mail.cargodeliveries.co',
	port: 465,
	secure: true,
	auth: {
		user: 'mailer@cargodeliveries.co',
		pass: 'QwertyZ@Venus',
	},
});

const APP_NAME = 'Venus Shop';

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	console.log({ user });
	const email = user.email;
	const displayName = user.displayName ?? '';
	const uid = user.uid;

	return sendWelcomeEmail({ email, displayName, uid });
});
async function sendWelcomeEmail({ email, displayName, uid }) {
	const mailOptions = {
		from: `${APP_NAME} <shop@venus.com>`,
		to: email,
	};

	mailOptions.subject = `Welcome to ${APP_NAME}!`;
	mailOptions.text = `${
		displayName ? `Hello ${displayName}!` : ''
	}. Welcome to ${APP_NAME}. We hope you will enjoy our service.`;
	await mailTransport.sendMail(mailOptions);
	functions.logger.log('New welcome email sent to:', email);
	return null;
}
