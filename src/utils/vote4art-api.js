import axios from 'axios';
import { getAccessToken } from './auth-service';

// local
// const BASE_URL = 'http://localhost:3000/api/v1';
import { NotificationManager } from 'react-notifications';

// production
const BASE_URL = 'https://api.vote4art.eu/api/v1';

export { getPixels, postPixel };
const head = { headers: { Authorization: `Bearer ${getAccessToken()}` }}
function getPixels() {
	const url = `${BASE_URL}/public/pixels/ready`;
	return axios.get(url).then(response => JSON.parse(response.data)).catch(e => console.error(e));
}

function postPixel(xy, color) {
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
// return axios.delete(url, { headers: { Authorization: getAccessToken() } }).then(response => console.log(response.data));
