export const appFetch = async ({ url, body, method, token }) => {
	console.log({ url, body, method });
	return new Promise(async (res, rej) => {
		try {
			var raw = JSON.stringify(body);

			var requestOptions = {
				method: method ?? 'GET',
				redirect: 'follow',
				headers: {
					'Content-Type': 'application/json',
					...(token && {
						Authorization: 'Bearer ' + token,
					}),
				},
				body: raw,
			};

			const response = await fetch(
				`https://venus-commerce.herokuapp.com${url}`,
				requestOptions
			);
			console.log({ response });
			const result = await response.json();
			console.log({ result });
			res(result);
		} catch (error) {
			console.log({ error });
			rej(error);
		}
	});
};
