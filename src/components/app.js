import { h, Component } from 'preact';
import { Router } from 'preact-router';
// import { login } from '../utils/auth-service';
import Header from './header';
import NotFound from '../routes/404';
import Game from '../routes/game';
import Read from '../routes/read';

import Helmet from 'preact-helmet';
import Footer from './footer';
import { checkAuth } from '../utils/auth-service';
import Userinfo from './userinfo';
import { NotificationManager } from 'react-notifications';
import { getRewar } from '../utils/loc-service';
import Fingerprint from 'fingerprintjs';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	state = {
		user: {
			attributes: {},
			meta: {}
		}
	};
	constructor() {
		super();
		if (typeof window !== 'undefined') { 
			if (window.requestIdleCallback) {
				requestIdleCallback(() => {
					this.fin = new Fingerprint().get();
					this.getInfo(this.fin);

				});
			} else {
				setTimeout(() => {
					this.fin = new Fingerprint().get();
					this.getInfo(this.fin);
				}, 500);
			}
		}
		this.arr = ['visited', 'success', 'error', 'logut', 'new'];
		if (typeof window !== 'undefined') { window.dataLayer = window.dataLayer || []; }
		

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

		checkAuth(this.fin).then( resp => {
			if ( !resp.attributes.pixels ) {
				localStorage.setItem('pixelStop', true);
			}
			else {
				localStorage.setItem('pixelStop', false);
			}
			this.setState({ user: resp, logined: true });
			if (window.location.pathname.length > 13) {
				getRewar(window.location.pathname).then( e => {
					if (e === 'ok') this.getInfo();
				});
			}
		 }).catch(e => {
			localStorage.setItem('pixelStop', true);

			if (window.location.pathname.length > 13) {
				localStorage.setItem('rewardPath', window.location.pathname);
				localStorage.setItem('needReward',  true);
				NotificationManager.info('Privaloma autiorizacija');
			}
		});
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
	gtag(){window.dataLayer.push(arguments);}

	componentDidMount() {
		this.gtag('js', new Date());
 
		this.gtag('config', 'UA-140710174-1');
		// patikrinam user;
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.innerHTML = `!function(f,b,e,v,n,t,s)
		{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};
		if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
		n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t,s)}(window,document,'script',
		'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '305085283706777'); 
		fbq('track', 'PageView');`;
		this.base.appendChild(s);
	}

	render() {
		// document.body.classList.add('mdc-theme--main');
		  const base = 'https://vote4art.eu/';
		  // const base = 'https://localhost:8080';
		
		return (
			<div id="app">
				<Helmet
					title="vote4art.eu"
					base={{ href: base }}
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
						data={this.state.user.attributes}
						hash={{ hash: this.state.hash || '' }}
						callToApp={this.respUser}
					/> : ''
				}
				<Router onChange={this.handleRoute}>
					<Read path="/dalivavau" />
					<Game user={this.state.user ? this.state.user.attributes : false} gameState={this.state} path="/" callToApp={this.respGame} />
					<Game user={this.state.user ? this.state.user.attributes : false} gameState={this.state} path="/:x?/:y?/:zoom?/:hash?/" callToApp={this.respGame} />
					<NotFound default />
				</Router>
				<Footer selectedRoute={this.state.currentUrl} />

				<script async defer crossorigin="anonymous" src="https://connect.facebook.net/lt_LT/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.3&appId=449621362498990" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-140710174-1" />
				<noscript>
					<img height="1" width="1"
						src="https://www.facebook.com/tr?id=305085283706777&ev=PageView
				&noscript=1" 
				/>
				</noscript>
				{/* local 284507289101227 prod 449621362498990 */}
			</div>
			
		);
	}
}
