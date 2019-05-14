import { h, Component } from 'preact';
import { route } from 'preact-router';
import Login from '../auth/login';

// material
import TopAppBar from 'preact-material-components/TopAppBar';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
// import Switch from 'preact-material-components/Switch';
// import TabBar from 'preact-material-components/TabBar';

// import 'preact-material-components/Dialog/style.css';
// import 'preact-material-components/Drawer/style.css';
// import 'preact-material-components/List/style.css';

import style from './style.scss';

import 'preact-material-components/Menu/style.css';
// import 'preact-material-components/Button/style.css';
import 'preact-material-components/TabBar/style.css';

export default class Footer extends Component {
	render(props) {
		return (
			<div class={`${style.footer} mdc-top-app-bar`}>
				<div class={style.footer_row}>
					<div>
					 ©2019 „Europos Komisijos atstovybė Lietuvoje“
					</div>
					<div>
						Sąlygos
					</div>
				</div>
			</div>
		);
	}
}
