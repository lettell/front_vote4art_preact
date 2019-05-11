import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { login } from '../utils/auth-service';

import Header from './header';
import Home from '../routes/home';
import NotFound from '../routes/404';
import Game from 'async!../routes/game';
// import Profile from 'async!../routes/profile';

import Helmet from 'preact-helmet';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
	};

	render() {
		// document.body.classList.add('mdc-theme--main');

		return (
			<div id="app">
				<Helmet
					title="vote4art.eu"
					// base={{ target: '_blank', href: 'http://localhost:8080/' }}
				/>
				<link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet" />
				<Header selectedRoute={this.state.currentUrl} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Game path="/game/:x?/:y?/:zoom?" />

					{/* <Profile path="/profile/" user="me" /> */}
					{/* <Profile path="/profile/:user" /> */}

					<NotFound default />
				</Router>
			</div>
		);
	}
}
