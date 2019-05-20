import { h, Component } from 'preact';
import { Router } from 'preact-router';
// import { login } from '../utils/auth-service';

import Header from './header';
import Home from '../routes/home';
import NotFound from '../routes/404';
import Game from '../routes/game';
import Registration from '../routes/registration';
import Start from '../routes/start';
import Redirect from '../routes/redirect';

import Helmet from 'preact-helmet';
import Footer from './footer';
import { checkAuth } from '../utils/auth-service';
import Userinfo from './userinfo';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	constructor() {
		super();
		this.arr = ['visited', 'success', 'error', 'logut', 'new'];
		if ( typeof window !== 'undefined') {
			this.state = {
				gameState: localStorage.gameState || -1,
				provider: undefined
			};
		}
		this.hash;
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
			this.setSt(resp.meta);
			this.user = resp;
		} );
	}
	respHead = e => {
		this.getInfo();
		this.setState({update: true})
	}

	respGame = e => {
		this.user.meta.active_pixels -= 1;
		this.setState({update: true})
	}

	handleRoute = e => {
		if (e.current.attributes.hash) {
			if (localStorage.gameState === 1) {
				this.setState({ hash: e.current.attributes.hash });
			} else {
				localStorage.setItem('hash', e.current.attributes.hash);
			}
		}
		// this.setState({
		// 	currentUrl: e.url
		// });
	};
	componentDidMount() {
		this.getInfo();
		document.body.classList.add('noScroll');

	}

	render() {
		// document.body.classList.add('mdc-theme--main');
		// const base = 'https://vote4art.eu/';
		const base = 'http://192.168.0.100:8080';
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
				{ this.state.logined && !this.state.needTerms ?
					<Userinfo
						data={this.user}
						hash={{ hash: this.state.hash }}
						callToApp={this.respUser}
					/> : ''
				}

				<Router onChange={this.handleRoute}>
					<Game gameState={this.state} path="/:x?/:y?/:zoom?/:hash?" callToApp={this.respGame} />
					{/* <Redirect path="/callback" reloadUser={this.respHead} /> */}

					<NotFound default />
				</Router>
				<Footer selectedRoute={this.state.currentUrl} />

			</div>
		);
	}
}
