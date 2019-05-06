import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { login } from '../utils/auth-service';

import Header from './header';
import Home from '../routes/home';
import NotFound from '../routes/404';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

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
				<link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet" />

				<Header selectedRoute={this.state.currentUrl} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					{/* <Profile path="/profile/" user="me" /> */}
					{/* <Profile path="/profile/:user" /> */}

					<NotFound default />
				</Router>
			</div>
		);
	}
}
