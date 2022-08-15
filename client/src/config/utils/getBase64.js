export const getBase64 = (file) => {
	console.log({ file });
	return new Promise((resolve, reject) => {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (e) {
			console.log(reader.result);
			resolve(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
			reject(error);
		};
	});
};
