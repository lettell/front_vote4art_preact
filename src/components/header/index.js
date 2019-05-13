import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
// import Switch from 'preact-material-components/Switch';
// import TabBar from 'preact-material-components/TabBar';

import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.scss';
import style from './style';

import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/TabBar/style.css';

export default class Header extends Component {
	closeDrawer() {
		this.state = {
			darkThemeEnabled: false
		};
	}

	toggleMenu = () => {
		this.menu.MDComponent.open = !this.menu.MDComponent.open;

	}

	openContent = (e) => {
		this.setState({ dialogContent: e.target.id });
		this.dialog.MDComponent.show();
	}

	dialogRef = dialog => (this.dialog = dialog);
	menuRef = menu => (this.menu = menu);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');
	render(props) {
		return (
			<div>
				<TopAppBar className="topappbar mdc-elevation--z3">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<img class={style.logo} src="/assets/images/logo.png" />
							<TopAppBar.Title></TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-center shrink-to-fit >
							<div>
								<Button id="about" onClick={this.openContent} raised className="mdc-theme--secondary-bg">Prisijungti</Button>
							</div>

						</TopAppBar.Section>
						<TopAppBar.Section align-end shrink-to-fit >
							<div>
								<Button id="about" onClick={this.openContent} unelevated>APIE</Button>
								<Button id="rules" onClick={this.openContent} unelevated >TAISYKLĖS</Button>
								<Button id="duk" onClick={this.openContent} unelevated>D.U.K</Button>
							</div>

						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>

				<Dialog ref={this.dialogRef}>
					<Dialog.Header>
						{this.state.dialogContent === 'duk'?
							<h1>D.U.K</h1>:
							this.state.dialogContent === 'rules'?
								<h1>TAISYKLĖS</h1>:
								this.state.dialogContent === 'about'?
									<h1>APIE</h1>: ''

						}
						{/* <Dialog.FooterButton style="float: right;" cancel>

						</Dialog.FooterButton> */}
					</Dialog.Header>
					<Dialog.Body>
						{this.state.dialogContent === 'duk'?
							<h1>D.U.K</h1>:
							this.state.dialogContent === 'rules'?
								<h1>TAISYKLĖS</h1>:
								this.state.dialogContent === 'about'?
									<h1>APIE</h1>: ''
						}

					</Dialog.Body>
					<Dialog.Footer>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
