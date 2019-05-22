import { h, Component } from 'preact';
// import { route } from 'preact-router';
import { login, facebookLogin, logout, signup } from '../../../utils/auth-service';
import { route } from 'preact-router';

import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import Checkbox from 'preact-material-components/Checkbox';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import 'preact-material-components/TextField/style.css';


import style from './style';


export default class Registration extends Component {
	
	
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			confirmation_password: ''

		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.registerSimple = this.registerSimple.bind(this);

	}
	registerSimple = () => {
		this.state.terms_and_conditions = this.cb.MDComponent.checked;
		signup(this.state).then( (resp) => {
			if (resp) {
				this.setState({});
				this.props.callToDialog('wellcome');
				// atidziai atiduot statusa backend !!!
		
				if (localStorage.needReward) {
					localStorage.removeItem('needReward');
					route(localStorage.rewardPath);
				}
				else {
					route('/');
				}
			}
		});
	}
	rules = () => {
		this.props.callToRules(this.state);
	}
	toLoging = () => {
		this.props.callToDialog('login');
	}
	checkRef = cb => (this.cb = cb);

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		localStorage.removeItem('provider');
		this.setState({
			[name]: value
		});
	}
	validatePassword(e){
		if (this.state.password !== this.state.confirmation_password) {
			e.target.setCustomValidity('Slaptažodis nesutampa');
		}
		else {
			e.target.setCustomValidity('');
		}
	}
	
	fbLogin = ( ) => {
		FB.login( (response) => {
			if (response.status === 'connected') {
				FB.api('/me', (response) => {
					facebookLogin({ id: ''+response.id, name: response.name }).then(resp => {
						if (resp.status === 'error') {
							localStorage.setItem('provider', 'fb');

							this.rules();
						}
						else {
							localStorage.removeItem('provider');
							this.props.callToDialog('success');
							// atidziai atiduot statusa backend !!!
							if (localStorage.needReward) {
								localStorage.removeItem('needReward');
								route(localStorage.rewardPath);
					
							}
							else {
								route('/');
							}

						}
					});
				});
			}
		});
	}

	responseGoogle = (data) => {
		// console.log("Google:", data)
		// googleLogin(accessToken);
	}
	respGoogleFail = (data) => {
		// console.log("Google:", data)
	}
	componentDidMount = () => {

		if (this.props.backState && this.props.backState.terms_and_conditions) {
			this.cb.MDComponent.checked = true;
		}
	}
	componentWillMount = () => {
		this.setState(this.props.backState);
	}
	render(props) {
		return (
			<div>
				<form class={style.container} onSubmit={this.registerSimple} action="javascript:" >
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
						onInput={this.validatePassword}

						label="Slaptažodis"
					/>
					<TextField
						type="password"
						name="confirmation_password"
						value={this.state.confirmation_password}
						required
						minLength={6}
						maxLength={20}
						onInput={this.handleInputChange}
						onChange={this.validatePassword}
						label="Pakartori slaptažodį"
					/>


					<div class={style.reg_actions}>
						<div class={style.check}>
							<div class="mdc-button mdc-button--unelevated" onClick={this.rules}>Taisyklės</div>
							<Checkbox id="rules" required ref={this.checkRef} />
							<label for="basic-checkbox"  id="rules">sutinku</label>

						</div>
						<div class={style.login}>
							<Button  secondary type="submit">Registruotis</Button>
						</div>
					</div>
				</form>
				<h1>Arba registruokis per</h1>
				<hr />
				<div class={style.social}>
					<div>
						<button class="loginBtn loginBtn--facebook" onClick={this.fbLogin}>
						Facebook
						</button>

					</div>

					<div>
						<h4 style="margin-right: 0.5em;">Jau užsiregistraves ?</h4><Button onClick={this.toLoging} unelevated>Prisijungti</Button>
					</div>
				</div>
	

			</div>
		);
	}
}
