import { useRef, useEffect } from 'react';

const config = {
	devUrl: 'http://localhost:3001/items/',
	apiUrl: 'https://todolist-back-taupe.vercel.app/items/',
};

export async function getRequest(url) {
	let fullUrl;
	if (process.env.REACT_APP_STATE === 'production') {
		fullUrl = url.toLowerCase().startsWith('https://') ? url : config.apiUrl + url;
	} else fullUrl = url.toLowerCase().startsWith('http//') ? url : config.devUrl + url;
	const res = await fetch(fullUrl, {
		method: 'GET',
	})
		.then((response) => (response.ok ? response.json() : response.text()))
		.catch((error) => console.log(error));
	return res;
}

export async function postRequest(url, data, contentType = 'application/json') {
	let fullUrl;
	if (process.env.REACT_APP_STATE === 'production') {
		fullUrl = url.toLowerCase().startsWith('https://') ? url : config.apiUrl + url;
	} else fullUrl = url.toLowerCase().startsWith('http//') ? url : config.devUrl + url;
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
	let fullUrl;
	if (process.env.REACT_APP_STATE === 'production') {
		fullUrl = url.toLowerCase().startsWith('https://') ? url : config.apiUrl + url;
	} else fullUrl = url.toLowerCase().startsWith('http//') ? url : config.devUrl + url;
	console.log(fullUrl);
	const res = await fetch(fullUrl, {
		method: 'DELETE',
	})
		.then((response) => (response.ok ? response.json() : response.text()))
		.catch((error) => console.error(error));
	return res;
}

export function getFormatedDate(inputDate, format = 'DD/MM/YYYY') {
	if (!inputDate) return;

	//parse the input date if different from new Date()
	const date = new Date(inputDate);

	//extract the parts of the date
	const day = date.getDate(); // DD
	const month = date.getMonth() + 1; // MM
	const year = date.getFullYear(); // YYYY

	//replace the infos
	format = format.replace('DD', day.toString().padStart(2, '0'));
	format = format.replace('MM', month.toString().padStart(2, '0'));

	//replace the year
	if (format.indexOf('YYYY') > -1) {
		format = format.replace('YYYY', year.toString());
	} else if (format.indexOf('YY') > -1) {
		format = format.replace('YY', year.toString().substring(2, 2));
	}

	return format;
}

export const useOutsideClick = (callback) => {
	const ref = useRef(null);

	useEffect(() => {
		const handleClick = (event) => {
			if (!ref.current?.contains(event.target)) {
				callback();
			}
		};

		document.addEventListener('click', handleClick, true);

		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, [ref, callback]);

	return ref;
};
