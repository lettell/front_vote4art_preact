import { h, Component } from 'preact';
import { route } from 'preact-router';
import { login, isLogedIn, logout } from '../../utils/auth-service';

import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';

import style from './style';


export default class Auth extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginSimple = this.loginSimple.bind(this);


	}
	loginSimple() {
		login(this.state);
  }
  test() {
		isLogedIn();
	}
	logout() {
		logout();
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
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
				<Button raised className="mdc-theme--secondary-bg" onClick={this.loginSimple}>auth.login</Button>
				<Button raised className="mdc-theme--secondary-bg" onClick={this.test}>Users </Button>
				<Button raised className="mdc-theme--secondary-bg" onClick={this.logout}>Logout </Button>

			</div>
		);
	}
}
