import { h, Component } from 'preact';
import { Router } from 'preact-router';
// import { login } from '../utils/auth-service';

import Header from './header';
import Home from '../routes/home';
import NotFound from '../routes/404';
import Game from '../routes/game';
import Registration from '../routes/registration';
import Start from '../routes/start';

import Helmet from 'preact-helmet';
import Footer from './footer';
import { checkAuth } from '../utils/auth-service';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	
	respHead = e => {
		if (e) this.setState({ logined: true, loginType: 'pasikeisti' });
	}
	handleRoute = e => {
		// this.setState({
		// 	currentUrl: e.url
		// });
	};
	componentDidMount() {
		document.body.classList.add('noScroll');
		checkAuth().then(resp => console.log(resp));
	}

	render() {
		// document.body.classList.add('mdc-theme--main');
		const base = 'https://tvarkoma.vote4art.eu/';
		// const base = 'https://localhost:8080/';

		return (
			<div id="app">
				<Helmet
					title="vote4art.eu"
					base={{ target: '_blank', href: base }}
				/>
				<link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				<link rel="preload" href="/assets/animate.css" as="style" onload="this.rel='stylesheet'" />
				<Header selectedRoute={this.state.currentUrl} callToApp={this.respHead} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Game path="/game/:x?/:y?/:zoom?" />
					<Registration path="/registration/:city?" />
					<Start path="/start" />
					<NotFound default />
				</Router>
				<Footer selectedRoute={this.state.currentUrl} />

			</div>
		);
	}
}
