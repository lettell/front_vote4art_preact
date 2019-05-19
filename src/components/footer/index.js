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
			<div class={`${style.footer}`}>
				<div class={style.footer_row}>
					<div class={style.block_one}>
						<div>
							©2019 „Europos Komisijos atstovybė Lietuvoje“
						</div>
						<div>
							<a class="t_link" href="#">
								Sąlygos
							</a>
							<a  class="t_link"  href="#">
								Privatumas
							</a>
						</div>
					</div>

					<div class={style.block_two}>
						<div>
							<div>
							Susisiekite
							</div>
							<div>
								<a class="t_link"  href="mailto:info@vote4art.eu">info@vote4art.eu</a>
							</div>
						</div>
						<div class={style.wraper}>
							<img class={style.l_ek} src="assets/images/logo_ek.svg" alt="Eruropos Komisijos logo" />
							<img class={style.l_vrk} src="assets/images/VRK log 300x300.png" alt="VRK logo" />
						</div>
					</div>

				</div>
			</div>
		);
	}
}
