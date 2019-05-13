import { h, Component } from 'preact';
import { route } from 'preact-router';
import { login, facebookLogin, logout, signup } from '../../utils/auth-service';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import LayoutGrid from 'preact-material-components/LayoutGrid';
// import FacebookLogin from 'react-facebook-login';

import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Button/style.css';


import style from './style';


export default class Auth extends Component {
	constructor() {
		super();
		this.tab = 'login';
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
	responseFacebook = (response) => {
		
		facebookLogin(response);
	}	

	render(props) {
		return (
			<div>
				<div class="tab" class={style.auth_modal} >
					<LayoutGrid>
						<LayoutGrid.Inner>
							<LayoutGrid.Cell cols="10">
								<TextField
									type="text"
									name="username"
									onInput={this.handleInputChange}
									label="Slapyvardis"
								/>
							</LayoutGrid.Cell>
            				<LayoutGrid.Cell cols="10">						
								<TextField
									type="password"
									name="password"
									onInput={this.handleInputChange}
									label="Slaptažodis"
							/>
							</LayoutGrid.Cell>
							<LayoutGrid.Cell cols="10">	
								<Button raised className="mdc-theme--secondary-bg" onClick={this.swith}>auth.login </Button>
							</LayoutGrid.Cell>
							<LayoutGrid.Cell cols="10">	
								<hr />
								<Button raised className="mdc-theme--secondary-bg" onClick={this.isLogedIn}>auth.facebook  </Button>
							</LayoutGrid.Cell>
						</LayoutGrid.Inner>	
					</LayoutGrid>					
				</div>
			</div>
		);
	}
}
