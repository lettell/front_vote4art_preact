// const ID_TOKEN_KEY = 'id_token';

import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const ACCESS_TOKEN_KEY = 'va',
			ID_TOKEN_KEY = 'la',
	BASE_URL = 'https://api.vote4art.eu',
	// BASE_URL = 'http://localhost:3000',
 
	BASE_URL_PRIVATE = BASE_URL + '/api/v1';
// production

export function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function checkAuth() {
	const url = `${BASE_URL_PRIVATE}/users/info`;

	return axios.get(url,{ headers: { Authorization: `Bearer ${getAccessToken()}` } })
		.then((response) => {
			const data = JSON.parse(response.data);
			switch (response.status) {
				case 'info':
					NotificationManager.info('Info message');

					break;
				case 200:
				
					// NotificationManager.success(response.data.response, 'Sveiki !!!');
					// localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
					// Pakeisti!!
						localStorage.setItem('userStatus', data.data.meta.status);
					return data.data;
				case 'warning':
					NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
					break;
			}
		}).catch((error) => {
			// NotificationManager.error(error.response.data.msg
			// 	,'Klaida', 2000);
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
			localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
			switch (response.status) {
				case 'info':
					NotificationManager.info('Info message');

					break;
				case 200:
				
					NotificationManager.success(response.data.response, 'Sveiki prisijungę! ');
					// Pakeisti!!
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
	return axios.post(url, {
		username: pramas.username,
		password: pramas.password,
		password_confirmation: pramas.password_confirmation,
		terms_and_conditions: pramas.terms_and_conditions


	}).then((response) => {
		localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
		switch (response.status) {
			case 200: {
				NotificationManager.success('', 'Sveiki prisijungę!');
				return response.data;
			}
		}
	}).catch((e) => {
		NotificationManager.error(e.response.data.error.username[0]
			,'Klaida', 2000);
	});
}
export function logout() {
	// sendLogout();
	clearIdToken();
	clearAccessToken();
	localStorage.clear();
	window.location.href = '/game';
}

export function facebookLogin(data) {
	const url = `${BASE_URL}/auth/facebook/?facebook_access_token=${data}`;
	return axios.get(url).then(response => {
		localStorage.setItem('provider', 'fb');
		localStorage.setItem(ACCESS_TOKEN_KEY, response.headers.authorization);
		NotificationManager.success(response.data.response, 'Sveiki prisijungę!');

		return response.data;
	}).catch((error) => {
		NotificationManager.error(error.response.data
			,'Nepavyko prisijungti', 2000);
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

// function sendLogout() {
// 	const url = `${BASE_URL}/logout`;
// 	return axios.delete(url, { headers: { Authorization: getAccessToken() } }).then(response => console.log(response.data));
// }

function clearAccessToken() {
	localStorage.removeItem(ACCESS_TOKEN_KEY);

}