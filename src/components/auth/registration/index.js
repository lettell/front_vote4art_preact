import { h, Component } from 'preact';
// import { route } from 'preact-router';
import { login, facebookLogin, logout, signup } from '../../../utils/auth-service';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import 'preact-material-components/TextField/style.css';


import style from './style';


export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			password_confirmation: ''

		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loginSimple = this.loginSimple.bind(this);
		this.registerSimple = this.registerSimple.bind(this);
		this.swith = this.swith.bind(this);

	}
	registerSimple = () => {
		register(this.state).then( (resp) => {
			if (resp) {
				this.props.callToDialog(resp);
			}
		});

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
	responseGoogle = (data) => {
		console.log("Google:", data)
		// googleLogin(accessToken);
	}
	respGoogleFail = (data) => {
		console.log("Google:", data)
	}
	render(props) {
		return (
			<div class={style.container}>
			<form onSubmit={this.loginSimple} action="javascript:" >
					<TextField
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleInputChange}
						required
						minLength={4}
						maxLength={20}
						label="Slapyvardis"
					/>
					<TextField
						type="password"
						name="password"
						value={this.state.password}
						required
						minLength={6}
						maxLength={20}
						onChange={this.handleInputChange}
						label="Slaptažodis"
					/>
					<div class={style.login}>
						<Button  secondary >Prisijungti</Button>
					</div>
				</form>
				<h1>Arba prisijunkite per</h1>
				<hr />
				<div class={style.social}>
					<div>
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
					<div>
				  <GoogleLogin
							clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
							buttonText="Google"
							onSuccess={this.responseGoogle}
							onFailure={this.respGoogleFail}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
					<div>
					<h4 style="margin-right: 0.5em;">Naujas vartotojas ?</h4><Button onClick={this.registrationSimple} unelevated>Registracija</Button>
					</div>
				</div>
	

			</div>
		);
	}
}
