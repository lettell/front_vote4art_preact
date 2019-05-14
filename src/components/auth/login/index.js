import { h, Component } from 'preact';
// import { route } from 'preact-router';
import { login, facebookLogin, logout, signup } from '../../../utils/auth-service';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import FacebookLogin from 'react-facebook-login';

import 'preact-material-components/TextField/style.css';


// import style from './style/style';


export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loginSimple = this.loginSimple.bind(this);
		this.registerSimple = this.registerSimple.bind(this);
		this.swith = this.swith.bind(this);

	}
	loginSimple() {
		login(this.state);
	}
	registerSimple() {
		signup(this.state);
	}
	swith = (e) => {
		if (this.tab === 'register') {
			this.tab = 'login';
			this.base.getElementsByClassName('tab')[1].classList.remove('disabled');
			this.base.getElementsByClassName('tab')[0].classList.add('disabled');
		}
		else {
			this.tab = 'register';
			this.base.getElementsByClassName('tab')[0].classList.remove('disabled');
			this.base.getElementsByClassName('tab')[1].classList.add('disabled');
		}

	}
	logout() {
		logout();
	}
	isLogedIn() {
		// isLogedIn();
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	responseFacebook = ({accessToken}) => {
		facebookLogin(accessToken);
	}
	

	render(props) {
		return (
			<div>
				<TextField
					type="text"
					name="username"
					onInput={this.handleInputChange}
					label="Slapyvardis"
				/>
				<TextField
					type="password"
					name="password"
					onInput={this.handleInputChange}
					label="Slaptažodis"
				/>
				<Button unelevated onClick={this.loginSimple}>Prisijungti</Button>
				<Button unelevated onClick={this.navigateToRegister}>Naujas </Button>

				<h1>Arba prisijunkite per</h1>
				<hr />
				<FacebookLogin
					appId="284507289101227"
					// autoLoad
					fields=""
					textButton="Facebook"
					icon="fa-facebook"
					// redirectUri="http://localhost:9292/auth/facebook/callback"
					// onClick={componentClicked}
					callback={this.responseFacebook}
				/>
			</div>
		);
	}
}
