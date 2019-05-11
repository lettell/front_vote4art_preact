import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Auth from '../auth';
import Dialog from 'preact-material-components/Dialog';
// import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
// import style from './style';


import 'preact-material-components/TabBar/style.css';
// import TabBar from 'preact-material-components/TabBar';

export default class Header extends Component {
	closeDrawer() {
		this.state = {
			darkThemeEnabled: false
		};
	}


	openSettings = () => this.dialog.MDComponent.show();

	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	}

	render(props) {
		return (
			<div>
				<TopAppBar className="topappbar mdc-elevation--z3">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							{/* <img class={style.logo} src="/assets/images/logo.png" /> */}

							<TopAppBar.Title></TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<TopAppBar.Icon>settings</TopAppBar.Icon>
						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>

				<Dialog ref={this.dialogRef}>
					<Dialog.Header>auth.title
						<Dialog.FooterButton style="float: right;" cancel>close</Dialog.FooterButton>
					</Dialog.Header>
					<Dialog.Body>
						<Auth />
					</Dialog.Body>
					<Dialog.Footer>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
