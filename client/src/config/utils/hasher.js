import crypto from 'crypto-js';

export const hashVal = (val) => {
	const hashed = crypto.SHA512(val).toString();
	console.log({ hashed });
	return hashed;
};
