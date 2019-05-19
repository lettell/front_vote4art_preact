import { h, Component } from 'preact';
import { route } from 'preact-router';
import Login from '../auth/login';
import { NotificationContainer } from 'react-notifications';
import { acceptTerms } from '../../utils/auth-service';

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
import Terms from '../dialogs/terms';

import style from './style.scss';

import 'preact-material-components/Menu/style.css';
// import 'preact-material-components/Button/style.css';
import 'preact-material-components/TabBar/style.css';
import Registration from '../auth/registration';

export default class Header extends Component {
	state = {
		scrollModal: false,
	}
	closeDrawer() {
		this.state = {
			darkThemeEnabled: false
		};
	}
	setUserState() {
		if (typeof window !== "undefined") { 
			return this.setState({ userState: localStorage.userState });
		}
	}

	callBackFromLogin = (state) => {
		if (state === 'registracija') {
			this.setState({ dialogContent: 'registracija' });

		}
		if (state.status === 'success'){
			this.dialog.MDComponent.close();
			this.props.callToApp(true);
		}
	}
	callBackFromRegistration = (state) => {
		if (state === 'login') {
			this.setState({ dialogContent: 'login' });

		}
		if (state.status === 'success'){
			this.dialog.MDComponent.close();
			this.props.callToApp(true);
		}
	}
	acceptTerms = () => {
		if(localStorage.provider && localStorage.provider === 'fb') {
			acceptTerms();
			localStorage.setItem('userState', 'success');
			this.dialog.MDComponent.close();
		}
		else {
			this.state.backState.terms_and_conditions = true;
			this.setState({ dialogContent: 'registracija'});
		}


	}
	callBackFromRegterms = (state) => {
		this.setState({ scrollModal: true });
		this.setState({ dialogContent: 'rules', editrule: 'register', backState: state });

	}
	openContent = (e) => {
		if (e.target.id === 'rules') this.setState({ scrollModal: true });
		this.setState({ dialogContent: e.target.id });
		if (typeof window !== "undefined") { 

			this.dialog.MDComponent.show();
		 }
	}
	closeContent = (e) => {
		this.dialog.MDComponent.close();
	}

	testScreen() {
		if (typeof window !== "undefined") {
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
		this.closeDrawer();
	};
	componentWillMount() {
		this.testScreen();
	}
	componentDidMount() {
		this.setUserState();
	}

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');
	render(props) {
		return (
			<div>
	     	<NotificationContainer />
				<TopAppBar className={`${style.topappbar} mdc-elevation--z3`}>
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<img class={style.logo} src="/assets/images/logo.png" />
							<TopAppBar.Title></TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-center >
							<div class={style.c_btn}>
								<a href="https://ec.europa.eu/lithuania/home_lt" target="_blank">
									<img class={style.l_ek} src='/assets/images/logo_ek.svg' alt="Eruropos Komisijos logo" />
								</a>
								<Button id="game" onClick={this.openContent} unelevated>ŽAIDIMAS</Button>
								<Button id="rules" onClick={this.openContent} unelevated >TAISYKLĖS</Button>
								<a href="https://www.vrk.lt/" target="_blank">
									<img class={style.l_vrk} src='/assets/images/VRK log 300x300.png' alt="VRK logo" />
								</a>
							</div>
						</TopAppBar.Section>

						<TopAppBar.Section align-end shrink-to-fit >
							<div class={style.mobile_h}>
								<Button id="login" onClick={this.openContent} secondary>Prisijungti</Button>
							</div>
						</TopAppBar.Section>
					</TopAppBar.Row>
					<div class={style.row_two}>
						<TopAppBar.Row>
							<TopAppBar.Section align-center shrink-to-fit>
								<div class={style.mobile_m}>
									<Button id="game" onClick={this.openContent} unelevated>ŽAIDIMAS</Button>
									<Button id="rules" onClick={this.openContent} unelevated >TAISYKLĖS</Button>
									<Button id="login" onClick={this.openContent} secondary>Prisijungti</Button>
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
										<h1 style="display: inline">REGISTRACIJA</h1>: ''

						}
					<span style="float: right;">
						<Dialog.FooterButton cancel={true}>
								<Button id="rules" onClick={this.closeContent} unelevated >Uždaryti</Button>
						</Dialog.FooterButton>
						</span>

					</Dialog.Header>
					<Dialog.Body scrollable={this.state.scrollModal}>
						{
							this.state.dialogContent === 'game'?
								<article>
									<p>Kasdien nuo gegužės 20 d. iki Europos Parlamento rinkimų gauk pikselių ir platformoje Vote4Art kurk virtualų piešinį. Rinkimų dieną atėjęs balsuoti gausi dar daugiau pikselių ir galėsi palikti savo žymę bendrame virtualiame piešinyje, kuris taps mūsų istorijos dalimi.
									</p>
									<p>
								Nuo registracijos pradžios kas 1 valandą gausi po 1 pikselį. Dienos pikselius galėsi kaupti (iki 24 per dieną), bet jei jų neišnaudosi iki dienos pabaigos, vidurnaktį jie anuliuosis.
									</p>
									<p>
								Burk koalicijas ir koordinuok veiksmus su kitais. Nesnausk, nes kiti žaidėjai gali perimti tavo iniciatyvą ir piešti kitaip, nei nori tu.
									</p>
									<p>
								Kulminacija laukia rinkimų dieną. Atėjęs į rinkimų apylinkę, nuskanavęs plakatą su QR kodu ir patvirtinęs savo buvimo vietą būsi apdovanotas papildomais 84 pikseliais. Ateidamas balsuoti tu įgysi žymiai didesnę įtaką galutiniam piešiniui.
									</p>
									<p>
								Paskutinius pikselius galėsi padėti iki gegužės 26 d. 20.00 val. Bendrai sukurtas piešinys taps mūsų visų istorijos dalimi.
									</p>
								</article>:
								this.state.dialogContent === 'rules'?
									<Terms callHeader={this.callBackFromRegterms}/>:
									this.state.dialogContent === 'login' ?
										<Login callToDialog={this.callBackFromLogin} callToRules={this.callBackFromRegterms}  /> :
										this.state.dialogContent === 'registracija' ?
											<Registration callToDialog={this.callBackFromRegistration} backState={this.state.backState} callToRules={this.callBackFromRegterms} /> :
											''

						}
					</Dialog.Body>
					<Dialog.Footer>
					{
							this.state.dialogContent === 'rules'?
								this.state.editrule ? 
									<Button onClick={this.acceptTerms} secondary>SUTINKU</Button>
									:'':
								this.state.dialogContent === 'game'?
									<Button id="registracija" onClick={this.openContent} secondary>ŽAISTI</Button>:
									this.state.dialogContent === 'login'?
										'':
										this.state.dialogContent === 'registracija'?
											'': ''

						}
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
