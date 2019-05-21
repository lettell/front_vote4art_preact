// const ID_TOKEN_KEY = 'id_token';

import { route } from 'preact-router';

import { NotificationManager } from 'react-notifications';
import { getAdd, getReward } from './vote4art-api';

export { resolveRew };


function resolveRew(path) {
	if (typeof window !== 'undefined') {
		const ah = path || window.location.pathname;
		const a =  ah.substring(0, 4);
		const	h = ah.substring(4, 12);
		const i = ['/is/', '/re/', '/ba/'].indexOf(a);
		switch (i) {
			case 0: {return needLocation(h);}
			case 1: {return reKla(h);}
			case 2: {return needLocation(h);}
			default: return route('/404');
		}
	}
}


// reikalinga vieta



function needLocation(hash) {
	if (navigator.geolocation) {
		NotificationManager.info('Lokacijos patvirtinimas');
		navigator.geolocation.getCurrentPosition((e) => {
			return showPosition(e, hash);
		});
	}
	NotificationManager.warn('Neveikia lokacija ');
}


function showPosition(position, hash) {
	const locParams = {
		lat: position.coords.latitude,
		long: position.coords.longitude,
		hash
	};
	if (!['9282c043', 'b357906c', 'bdb4defa'].includes(hash)) {
		return NotificationManager.error('Patikrinimas nepraeitas');
	}
	getRew(locParams);
}

function getRew(params) {
	getReward(params).then( rsp => {
		NotificationManager.success('Ačiū, kad dalyvaujate');
		localStorage.removeItem('reward_path');
		localStorage.removeItem('need_reward');
		route('/');
	}).catch(e => {
		NotificationManager.error('Patikrinimas nepraeitas');
		route('/');
	});
}

function reKla(h) {
	getAdd(h).then(resp => {
		this.respHead();
		NotificationManager.success('Papildomi pikseliai');
	}).catch(e => {
		NotificationManager.error('Patikrinimas nepraeitas');
	});
}

