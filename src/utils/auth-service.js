// const ID_TOKEN_KEY = 'id_token';

import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const ACCESS_TOKEN_KEY = 'va',
	    ID_TOKEN_KEY = 'la',
	BASE_URL = 'https://api.vote4art.eu/api/v1',
	BASE_URL_PRIVATE = BASE_URL + 'api/v1';
// production
// BASE_URL = 'http://localhost:3000/';

export function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function checkAuth() {
	const url = `${BASE_URL_PRIVATE}/users/info`;

	return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` } })
		.then((response) => {
			switch (response.status) {
				case 'info':
					NotificationManager.info('Info message');

					break;
				case 200:
				
					// NotificationManager.success(response.data.response, 'Sveiki !!!');
					// localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
					// Pakeisti!!
					// localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
					return response.data;
				case 'warning':
					NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
					break;
			}
		})
		.catch((error) => {
			NotificationManager.error(error.response.data.msg
				,'Klaida', 2000);
		});
}
export function setAccessToken(accessToken) {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}
export function login(pramas) {
	const url = `${BASE_URL}/login`;

	return axios.post(url, {
		username: pramas.username,
		password: pramas.password
	})
		.then((response) => {
			switch (response.status) {
				case 'info':
					NotificationManager.info('Info message');

					break;
				case 200:
				
					NotificationManager.success(response.data.response, 'Sveiki prisijungę! ');
					setAccessToken(response.headers.authorization);
					// Pakeisti!!
					// localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
					return response.data;
				case 'warning':
					NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
					break;
			}
		})
		.catch((error) => {
			NotificationManager.error(error.response.data
				,'Klaida', 2000);
		});
}
export function signup(pramas) {
	const url = `${BASE_URL}/api/v1/signup`;
	axios.post(url, {
		username: pramas.username,
		password: pramas.password,
		password_confirmation: pramas.password_confirmation,
		terms_and_conditions: pramas.terms_and_conditions


	}).then((response) => {
		switch (response.status) {
			case 200:

				NotificationManager.success(response.data.response, 'Sveiki prisijungę!');
				setAccessToken(response.headers.authorization);
				return response.data;

		}
	}).catch((error) => {
		NotificationManager.error(error.response.data
			,'Klaida', 2000);
	});
}
export function logout() {
	sendLogout();
	clearIdToken();
	clearAccessToken();
	window.location.href = '/';
}

export function facebookLogin(data) {
	const url = `${BASE_URL}/auth/facebook/?facebook_access_token=${data}`;
	return axios.get(url).then(response => {
		NotificationManager.success(response.data.response, 'Sveiki prisijungę!');
		setAccessToken(response.headers.authorization);
		localStorage.setItem('provider', 'fb');

		return response.data;
	}).catch((error) => {
		NotificationManager.error(error.response.data
			,'Klaida', 2000);
	});
}

export function acceptTerms() {
	const url = `${BASE_URL_PRIVATE}/users/accept_conditions`;
	return axios.put(url, { accept: true }, { headers: { Authorization: `Bearer ${getAccessToken()}` } }).then(response => {
		localStorage.setItem('provider', 'fb');

		return response.data;
	}).catch((error) => {
		NotificationManager.error(error.response.data
			,'Klaida', 2000);
	});
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