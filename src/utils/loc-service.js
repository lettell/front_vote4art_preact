// const ID_TOKEN_KEY = 'id_token';

import { route } from 'preact-router';

import { NotificationManager } from 'react-notifications';
import { getAdd, getReward } from './vote4art-api';

export { getRewar };


function getRewar(path) {

	return new Promise( ((resolve, reject) => {
		const p = path;
		function resolveRew(pa) {

			if (typeof window !== 'undefined') {
				const ah = pa || window.location.pathname;
				const a =  ah.substring(0, 4);
				const	h = ah.substring(4, 12);
				const i = ['/is/', '/re/', '/ba/'].indexOf(a);
				switch (i) {
					case 0: {needLocation(h); break;}
					case 1: {reKla(h);break; }
					case 2: {needLocation(h); break;}
					default: return route('/404');
				}
			}
		}


		// reikalinga vieta


		function needLocation(hash) {

			if (navigator.geolocation) {
				NotificationManager.info('Lokacijos patvirtinimas');
				return navigator.geolocation.getCurrentPosition((e) => {
					showPosition(e, hash);
				},	(error) => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							NotificationManager.error('Aktyvuokite vietovės nustatymą ir bandykite iš naujo');
							break;
						case error.POSITION_UNAVAILABLE:
							NotificationManager.error('Vietovės nustatyti nepavyko');
							break;
						case error.TIMEOUT:
							NotificationManager.error('Vietovės nustatimo laikas pasibaigė');
							break;
						case error.UNKNOWN_ERROR:
							NotificationManager.error('Kita nežinoma klaida');
							break;
					}
				});
			}
			NotificationManager.warrning('Neveikia lokacijos funkcija ');
		}


		function showPosition(position, hash) {

			const locParams = {
				lat: position.coords.latitude,
				long: position.coords.longitude,
				hash
			};
			if (!['9282c043', 'b357906c', 'bdb4defa'].includes(hash)) {
				NotificationManager.error('Nežinomas šaltinis');
			}
			getRew(locParams);
		}

		function getRew(params) {
			return getReward(params).then( rsp => {
				NotificationManager.success('Ačiū, kad dalyvaujate');
				localStorage.removeItem('reward_path');
				localStorage.removeItem('need_reward');
				route('/', true);
				resolve('ok');
			}).catch(e => {
				if (e.response.data.messages) {
					NotificationManager.error(e.response.data.messages);
				}
				else {
					NotificationManager.error(e.messages);
				}
				route('/');
				reject('not');
			});
		}

		function reKla(h) {
			getAdd(h).then(resp => {
				this.respHead();
				NotificationManager.success('Papildomi pikseliai');
			}).catch(e => {
			// NotificationManager.error('Patikrinimas neprae	itas');
			});
		}

		resolveRew(p);
   
	}));
}
