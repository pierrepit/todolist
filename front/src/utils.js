const config = {
	apiUrl: 'http://localhost:3001/items/',
	clientUri: 'http://localhost:3000',
	//wsUrl: 'ws://localhost:3001'
};

export async function getRequest(url) {
	const fullUrl = url.toLowerCase().startsWith('http') ? url : config.apiUrl + url;
	const res = await fetch(fullUrl, {
		method: 'GET',
	})
		.then((response) => (response.ok ? response.json() : response.text()))
		.catch((error) => console.log(error));
	return res;
}

export async function postRequest(url, data, contentType = 'application/json') {
	const fullUrl = url.toLowerCase().startsWith('http') ? url : config.apiUrl + url;
	const res = await fetch(fullUrl, {
		method: 'POST',
		headers: { 'Content-Type': contentType },
		body: JSON.stringify(data),
	})
		.then((response) => (response.ok ? response.json() : response.text()))
		.catch((error) => console.log(error));
	return res;
}

export async function deleteRequest(url) {
	const fullUrl = url.toLowerCase().startsWith('http') ? url : config.apiUrl + 'delete/' + url;
	const res = await fetch(fullUrl, {
		method: 'DELETE',
	})
		.then((response) => (response.ok ? response.json() : response.text()))
		.catch((error) => console.log(error));
	return res;
}
