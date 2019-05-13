// const ID_TOKEN_KEY = 'id_token';

import axios from 'axios';
import Layout from 'preact-material-components/Radio';

const ACCESS_TOKEN_KEY = 'va',
	    ID_TOKEN_KEY = 'la',
	// BASE_URL = 'http://localhost:3000',
	// BASE_URL_PRIVATE = BASE_URL + '/api/v1';
// production
BASE_URL = 'https://api.vote4art.eu';

export function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken) {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}
export function login(pramas) {
	const url = `${BASE_URL}/login`;

	axios.post(url, {
		username: pramas.username,
		password: pramas.password
	})
		.then((response) => {
			localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
}
export function signup(pramas) {
	const url = `${BASE_URL}/signup`;
	axios.post(url, {
		username: pramas.username,
		password: pramas.password,
		password_confirmation: pramas.password

	})
		.then((response) => {
      
			localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
			localStorage.setItem(ID_TOKEN_KEY, response.data.jti);

			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
}
export function logout() {
	sendLogout();
	clearIdToken();
	clearAccessToken();
	window.location.href = '/';
}

export function facebookLogin(data) {
	// // signedRequest
	// const url = `${BASE_URL}/auth/facebook/callback?code=${data.accessToken}`;
	// return axios.get(url, data).then(response => console.log(response.data)).catch( e => console.log(e));
}

function clearIdToken() {
	localStorage.removeItem(ID_TOKEN_KEY);
}

function sendLogout() {
	const url = `${BASE_URL}/logout`;
	return axios.delete(url, { headers: { Authorization: getAccessToken() } }).then(response => console.log(response.data));
}

function clearAccessToken() {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
}