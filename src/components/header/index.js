import { h, Component } from 'preact';
import { route } from 'preact-router';
import Login from '../auth/login';
import { NotificationContainer } from 'react-notifications';
import { acceptTerms, logout, facebookLogin } from '../../utils/auth-service';

// material
import TopAppBar from 'preact-material-components/TopAppBar';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
// import Switch from 'preact-material-components/Switch';
// import TabBar from 'preact-material-components/TabBar';

// import 'preact-material-components/Dialog/style.css';
// import 'preact-material-components/Drawer/style.css';
// import 'preact-material-components/List/style.css';
import 'react-notifications/lib/notifications.css';
import Rules from '../dialogs/rules';

import style from './style.scss';

import 'preact-material-components/Menu/style.css';
// import 'preact-material-components/Button/style.css';
import 'preact-material-components/TabBar/style.css';
import Registration from '../auth/registration';
import Aboutgame from '../dialogs/aboutgame';
import About from '../dialogs/about';

import Eu from '../dialogs/eu';
import Wellcome from '../dialogs/wellcome';

export default class Header extends Component {
	state = {
		scrollModal: false
	}
	closeDrawer() {
		this.state = {
			darkThemeEnabled: false
		};
	}
	logOut() {
		logout();
	}
	setUserState() {
		this.setState({ userState: localStorage.userState });
	
		if (!localStorage.visited) {
			this.setState({ dialogContent: 'game' });
			this.dialog.MDComponent.show();
		}
	}

	callBackFromLogin = (state) => {
		if (state === 'registracija') {
			this.setState({ dialogContent: 'registracija' });

		}
		if (state === 'success'){
			this.props.callToApp({ status: state, type: 'pixel' });
			setTimeout(() => {
				this.dialog.MDComponent.close();
			}, 1);

		}
	}
	callBackFromRegistration = (state) => {
		if (state === 'login') {
			this.setState({ dialogContent: 'login' });

		}
		if (state === 'success'){
			this.props.callToApp({ status: state, type: 'pixel' });
			setTimeout(() => {
				this.dialog.MDComponent.close();

			}, 1);

		}
		if (state === 'wellcome') {
			// this.props.callToApp({ status: state, type: 'pixel'});
			this.props.callToApp({ type: 'registered' });
			this.setState({ dialogContent: 'wellcome', logined: true });
		}
	}
	acceptTerms = () => {
		if (localStorage.provider === 'fb') {
			acceptTerms().then(resp => {
				localStorage.setItem('userState', 'success');
				this.setState({ dialogContent: 'wellcome', logined: true });

				// this.dialog.MDComponent.close();
				// this.dialog.MDComponent.close();
				this.setState({});
				this.props.callToApp(true);
			});
		}
		else {
			this.state.backState.terms_and_conditions = true;
			this.setState({ dialogContent: 'registracija' });
		}


	}
	callBackFromRegterms = (state) => {

		this.setState({ scrollModal: true });
		this.setState({ dialogContent: 'rules', editrule: 'register', backState: state });

	}
	openContent = (e) => {
		if (e.target.id === 'rules') this.setState({ scrollModal: true });
		this.setState({ dialogContent: e.target.id });
		if (typeof window !== 'undefined') {

			this.dialog.MDComponent.show();
		 }
	}
	closeContent = (e) => {
		this.dialog.MDComponent.close();
	}

	testScreen() {
		if (typeof window !== 'undefined') {
			const viewportheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			const viewportw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (viewportheight < 630) this.setState({ scrollModal: true });
			if (viewportw < 540) this.setState({ scrollModal: true });
		}
	}
	dialogRef = dialog => (this.dialog = dialog);
	menuRef = menu => (this.menu = menu);

	linkTo = path => () => {
		route(path);
	};
	componentWillReceiveProps ({ gameState }) {
		if (gameState)	this.setState(gameState);
	}
	componentWillMount() {
		this.testScreen();
	}
	componentDidMount() {

		this.setUserState();
	}


	goHome = this.linkTo('/');

	goRead = this.linkTo('/dalivavau');
	render(props) {
		return (
			<div>
	     	<NotificationContainer />
				<TopAppBar className={`${style.topappbar} mdc-elevation--z3`}>
					<TopAppBar.Row>
						<TopAppBar.Section align-center>
							<img onClick={this.goHome} class={style.logo} src="/assets/images/logo.png" />
							{
							// 	this.state.logined?
							// <Button onClick={this.goRead} unelevated >Balsavau</Button>: ''
							}

							<TopAppBar.Title></TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-center >
							<div class={style.mobile_login}>
								{ 
									// this.state.logined ?
   								// 	<Button onClick={this.logOut} secondary>Atsijungti</Button>:
									// <Button id="login" onClick={this.openContent} secondary>Prisijungti</Button>
								}
							</div>
							<div class={style.c_btn}>
								{/* <a href="https://ec.europa.eu/lithuania/home_lt" target="_blank">
									<img class={style.l_ek} src='/assets/images/logo_ek.svg' alt="Eruropos Komisijos logo" />
								</a> */}
								<Button id="about" onClick={this.openContent} unelevated>APIE PROJEKTĄ</Button>
								<Button id="game" onClick={this.openContent} unelevated>ŽAIDIMAS</Button>
								<Button id="rules" onClick={this.openContent} unelevated >TAISYKLĖS</Button>
								<Button id="eu" onClick={this.openContent} unelevated >EP RINKIMAI 2019</Button>

								{/* <a href="https://www.vrk.lt/" target="_blank">
									<img class={style.l_vrk} src='/assets/images/VRK log 300x300.png' alt="VRK logo" />
								</a> */}
							</div>
						</TopAppBar.Section>

						<TopAppBar.Section align-end shrink-to-fit >
							<div class={style.mobile_h}>
								{
									// this.state.logined ?
									// <Button onClick={this.logOut} secondary>Atsijungti</Button> :
									// <Button id="login" onClick={this.openContent} secondary>Prisijungti</Button>
								}
								
							</div>
				
						</TopAppBar.Section>
					</TopAppBar.Row>
					<div class={style.row_two}>
						<TopAppBar.Row>
							<TopAppBar.Section align-center shrink-to-fit>
								<div class={style.mobile_m}>
									<Button id="about" onClick={this.openContent} unelevated>APIE PROJEKTĄ</Button>
									<Button id="game" onClick={this.openContent} unelevated>ŽAIDIMAS</Button>
									<Button id="rules" onClick={this.openContent} unelevated >TAISYKLĖS</Button>
									<Button id="eu" onClick={this.openContent} unelevated >EP rinkimai 2019</Button>
								</div>
							</TopAppBar.Section>
						</TopAppBar.Row>
					</div>

				</TopAppBar>

				<Dialog ref={this.dialogRef}>
					<Dialog.Header>
						{
							this.state.dialogContent === 'rules'?
								<h1 style="display: inline">TAISYKLĖS</h1>:
								this.state.dialogContent === 'game'?
									<h1 style="display: inline">ŽAIDIMAS</h1>:
									this.state.dialogContent === 'login'?
										<h1 style="display: inline">PRISIJUNGIMAS</h1>:
										this.state.dialogContent === 'registracija'?
											<h1 style="display: inline">REGISTRACIJA</h1>:
											this.state.dialogContent === 'eu' ?
												<h1 style="display: inline">EP RINKIMAI 2019</h1>:
												this.state.dialogContent === 'wellcome' ?
													<h1 style="display: inline">SVEIKI !!!</h1>:
													this.state.dialogContent === 'about' ?
														<h1 style="display: inline">APIE PROJEKTĄ</h1>:''
														
						}
						<span style="float: right;">
							<Dialog.FooterButton cancel>
								<Button id="rules" onClick={this.closeContent} unelevated >Uždaryti</Button>
							</Dialog.FooterButton>
						</span>

					</Dialog.Header>
					<Dialog.Body scrollable={this.state.scrollModal}>
						{
							this.state.dialogContent === 'game'?
								<Aboutgame /> :			this.state.dialogContent === 'rules'?
									<Rules callHeader={this.callBackFromRegterms} />:
									this.state.dialogContent === 'login' ?
										<Login callToDialog={this.callBackFromLogin} callToRules={this.callBackFromRegterms}  /> :
										this.state.dialogContent === 'registracija' ?
											<Registration callToDialog={this.callBackFromRegistration} backState={this.state.backState} callToRules={this.callBackFromRegterms} /> :	this.state.dialogContent === 'eu' ?
												<Eu />:this.state.dialogContent === 'wellcome' ?
													<Wellcome />:this.state.dialogContent === 'about' ?
													<About />: ''

						}
					</Dialog.Body>
					{/* <Dialog.Footer>
						{
							this.state.dialogContent === 'rules'?
								this.state.editrule ?
									<Button onClick={this.acceptTerms} secondary>SUTINKU</Button>
									:'':
								 this.state.dialogContent === 'game' && !this.state.logined?
									<Button id="registracija" onClick={this.openContent} secondary>ŽAISTI</Button>:
									this.state.dialogContent === 'login'?
										'':
										this.state.dialogContent === 'registracija'?
											'': ''

						}
					</Dialog.Footer> */}
				</Dialog>
			</div>
		);
	}
}
