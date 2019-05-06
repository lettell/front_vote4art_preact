import axios from 'axios';
import { getAccessToken } from './AuthService';

// local
const BASE_URL = 'http://localhost:3000/api/v1/';

// production
// const BASE_URL = 'http://api.vote4art.eu';

// export {getFoodData, getCelebrityData};

// function getFoodData() {
//   const url = `${BASE_URL}/api/jokes/food`;
//   return axios.get(url).then(response => response.data);
// }

// function getCelebrityData() {
//   const url = `${BASE_URL}/api/jokes/celebrity`;
//   return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
// }
