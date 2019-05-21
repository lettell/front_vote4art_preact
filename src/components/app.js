import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
// import { login } from '../utils/auth-service';

import Header from './header';
import NotFound from '../routes/404';
import Game from '../routes/game';


import Helmet from 'preact-helmet';
import Footer from './footer';
import { checkAuth } from '../utils/auth-service';
import Userinfo from './userinfo';
import { NotificationManager } from 'react-notifications';
import { getReward, getAdd } from '../utils/vote4art-api';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	constructor() {
		super();
		this.state = {};
		this.arr = ['visited', 'success', 'error', 'logut', 'new'];
		if ( typeof window !== 'undefined') {
			this.state = {
				gameState: localStorage.gameState || -1,
				provider: undefined
			};
			this.hash;
			this.lo = localStorage.va || false;
			if (this.lo) {
				this.state.logined = true;
			}
		}

	}
	resolveState(e) {
		const res = this.arr;
		return {
			status: res.splice(e, 1)[0]
		};
	}

	setSt = (e) => {
		 localStorage.setItem('gameState', this.arr.indexOf(e.status));
		if (e.status === 'visited') this.setState({ logined: false, gameAutoload: false,  needTerms: false });
		if (e.status === 'success') this.setState({ logined: true, gameAutoload: false, needTerms: false });
		if (e.status === 'error') this.setState({ logined: true, gameAutoload: false, needTerms: true });
		if (e.status === 'new') this.setState({ logined: false, gameAutoload: true,  needTerms: false });
		if (e.status === 'success' && localStorage.hash) {
			this.setState({ hash: localStorage.hash });
			localStorage.removeItem('hash');
		}
	}
	getInfo() {
		checkAuth().then( resp => {
			if ( resp.meta.active_pixels ) {
				localStorage.setItem('pix', resp.meta.active_pixels);
			}
			this.setState({ user: resp });

		} );
	}
	respHead = e => {
		this.getInfo();
		this.setState({ update: true  });
	}

	respGame = e => {
		if (e.type === 'pixel') {
			this.respHead();
		}
		if (e.type === 'userState') {
			if (this.lo) {
				this.setState({ logined: true, needTerms: false });
				this.setState({ update: true });
			}
		 else {
				this.setState({ logined: false });
			}

		}
	}

	handleRoute = e => {
		if (e.current.attributes.hash) {
			this.setState({ hash: e.current.attributes.hash });
			localStorage.setItem('hash', e.current.attributes.hash);
		}
	}

	reKla(h) {
		getAdd(h).then(resp => {
			this.respHead();
			NotificationManager.success('Papildomi pikseliai');
		}).catch(e => {
			NotificationManager.error('Patikrinimas nepraeitas');
		});
	}

	needLocation() {
		this.check();
	}
	check() {
		if (navigator.geolocation) {
			NotificationManager.info('Lokacijos patvirtinimas');
			navigator.geolocation.getCurrentPosition(this.showPosition);
		}
	else {
			NotificationManager.warn('Neveikia lokacija');
		}
	}

		showPosition = (position) => {
			const locParams = {
				lat: position.coords.latitude,
				long: position.coords.longitude,
				hash: this.hash
			};
			if (!['9282c043', 'b357906c', 'bdb4defa'].includes(this.hash)) return;
			this.getReward(locParams);
		}
		getReward(params) {
			getReward(params).then( rsp => {
				NotificationManager.success('Ačiū, kad dalyvaujate');
				route('/');
			}).catch(e => {
				NotificationManager.error('Patikrinimas nepraeitas');
				route('/');
			});
		}
		resolveRew() {
			if (typeof window !== "undefined") {
				const ah = window.location.pathname;
		
				const a =  ah.substring(0, 4);
				const	h = ah.substring(4, 12);
				const i = ['/is/', '/re/', '/ba/'].indexOf(a);
				switch (i) {
					case 0: {return this.needLocation(h);}
					case 1: {return this.reKla(h);}
					case 2: {return this.needLocation(h);}
					default: false;
				}
			}
		}

		componentWillMount() {
			this.resolveRew();
		}
	
		componentDidMount() {
		
		this.getInfo();

		}
		render() {
		// document.body.classList.add('mdc-theme--main');
		const base = 'https://vote4art.eu/';
			// const base = 'http://localhost:8080/';
			return (
				<div id="app">
					<Helmet
						title="vote4art.eu"
						base={{ target: '_blank', href: base }}
					/>
					<link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
					<link rel="preload" href="/assets/animate.css" as="style" onload="this.rel='stylesheet'" />

					<Header
						gameState={this.state}
						selectedRoute={this.state.currentUrl}
						callToApp={this.respHead}
					/>

					{ this.state.logined  && this.state.user?
						<Userinfo
							data={this.state.user}
							hash={{ hash: this.state.hash || '' }}
							callToApp={this.respUser}
						/> : ''
					}
					<Router onChange={this.handleRoute}>
						<Game gameState={this.state} path="/" callToApp={this.respGame} />
						<Game  gameState={this.state} path="/:x?/:y?/:zoom?/:hash?/" callToApp={this.respGame} />
						<NotFound default />
					</Router>
					<Footer selectedRoute={this.state.currentUrl} />

					<script async defer crossorigin="anonymous" src="https://connect.facebook.net/lt_LT/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.3&appId=449621362498990" />
				</div>
			
			);
		}
}
