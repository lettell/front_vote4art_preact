import axios from 'axios';

// local
import { NotificationManager } from 'react-notifications';

// production
// const BASE_URL = 'https://api.vote4art.eu/api/v1';
const BASE_URL = 'http://localhost:3000/api/v1';

export { getPixels, postPixel, getReward, getAdd };


function getPixels() {
	const url = `${BASE_URL}/public/pixels/ready`;
	return axios.get(url).then(response => JSON.parse(response.data)).catch(e => console.error(e));
}
function getReward(params) {
	const head = { headers: { Authorization: `Bearer ${localStorage.va}` }}
	const url = `${BASE_URL}/rewards/reward`;
	return axios.post(url, params, head).then(response => JSON.parse(response.data));
}
function getAdd(params) {
	const head = { headers: { Authorization: `Bearer ${localStorage.va}` }}
	const url = `${BASE_URL}/rewards/reklaminis`;
	return axios.post(url, {hash: params}, head).then(response => JSON.parse(response.data));
}

function postPixel(xy, color) {
	let pix = parseInt(localStorage.pix);
	if (!isNaN(pix) && pix > 0) {
		if (typeof window !== "undefined") {
			const head = { headers: { Authorization: `Bearer ${localStorage.va}` }}
			const colo = color.trim();
			if (xy[0] > 1000 && xy[0] < 0 && xy[1] > 1000 && xy[1] < 0) return;
			if (11 > color.length && 18 > color.length) return;
			const pramas = {
				x: xy[0],
				y: xy[1],
				color: colo.trim()

			};
			const url = `${BASE_URL}/pixels`;
			return axios.post(url, pramas, head).then(response => JSON.parse(response.data));
		}
}
}
// return axios.delete(url, { headers: { Authorization: getAccessToken() } }).then(response => console.log(response.data));
