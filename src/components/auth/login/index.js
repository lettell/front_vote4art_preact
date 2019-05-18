import { h, Component } from 'preact';
// import { route } from 'preact-router';
import { login, facebookLogin, logout, checkAuth } from '../../../utils/auth-service';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import 'preact-material-components/TextField/style.css';


import style from './style';

import Snackbar from 'preact-material-components/Snackbar';

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loginSimple = this.loginSimple.bind(this);
	}
	loginSimple = () => {
		login(this.state).then( (resp) => {
			if (resp) {
				this.props.callToDialog(resp);
			}
		});

	}
	rules = () => {
		this.props.callToRules(this.state);
	}
	logout() {
		logout();
	}
	isLogedIn() {
		checkAuth();
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
		facebookLogin(accessToken).then(resp => {
			this.setState({ provider: 'facebook' });
			if (resp.status === 'authenticated'){ 
				this.rules();
			}
			else {
				this.props.callToDialog(resp);
			}
		});
	}
	responseGoogle = (data) => {
		console.log("Google:", data)
		// googleLogin(accessToken);
	}
	respGoogleFail = (data) => {
		console.log("Google:", data)
	}
	goToRegister() {}
	render(props) {
		return (
			<div class={style.container}>
			<form class={style.container} onSubmit={this.loginSimple} action="javascript:" >
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
				<h1 onClick={this.isLogedIn}>Arba prisijunkite per</h1>
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
					<h4 style="margin-right: 0.5em;">Naujas vartotojas ?</h4><Button onClick={this.goToLogin} unelevated>Registracija</Button>
					</div>
				</div>
	

			</div>
		);
	}
}
