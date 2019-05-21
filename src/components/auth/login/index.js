import { h, Component } from 'preact';
// import { route } from 'preact-router';
import { route } from 'preact-router';

import { login, facebookLogin, checkAuth } from '../../../utils/auth-service';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin } from 'react-google-login';

import 'preact-material-components/TextField/style.css';


import style from './style';

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loginSimple = this.loginSimple.bind(this);
	}
	loginSimple = () => {
		login(this.state).then((resp) => {
			if (resp) {
				this.props.callToDialog(resp.status);
				window.location.href = '/';
			}
		});
	}
	rules = () => {
		this.props.callToRules(this.state);
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


	fbLogin = ( ) => {
		FB.login( (response) => {
			if (response.status === 'connected') {
				FB.api('/me', (response) => {
				facebookLogin({id: ""+response.id, name: response.name}).then(resp => {
						if (resp.status === 'error') {
							this.rules();
						}
						else {
							this.props.callToDialog('success');
							window.location.href = '/';

						}

					});
				});
			}
		});
	}

	goToRegister = () => {
		this.props.callToDialog('registracija');
	}

	render(props) {
		return (
			<div class={style.container}>
				<form class={style.container} autocomplete="off" action="javascript:" onSubmit={this.loginSimple} >
					<TextField
						type="text"
						name="username"
						value={this.state.username}
						onInput={this.handleInputChange}
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
						<Button secondary >Prisijungti</Button>
					</div>
				</form>
				<h1 onClick={this.fbLogin}>Arba prisijunkite per</h1>
				<hr />
				<div class={style.social}>
					<div>
					<button class="loginBtn loginBtn--facebook" onClick={this.fbLogin}>
						Facebook
					</button>

					</div>

					<div>
						<h4 style="margin-right: 0.5em;">Naujas vartotojas ?</h4><Button onClick={this.goToRegister} unelevated>Registracija</Button>
					</div>
				</div>


			</div>
		);
	}
}
