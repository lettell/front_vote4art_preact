import { h, Component } from 'preact';
import { route } from 'preact-router';

import style from './style.scss';

export default class Userinfo extends Component {

	constructor() {
		super()
		this.params = {
			lat: 0,
			long: 0,
			hash: null
		};
	}

	componentDidMount(props) {
		if (this.props.hash && this.props.hash.hash && this.props.hash.hash.length) this.checkAndSend(this.props.hash);
	}
	render(props) {
		return (
			<div class={style.container}>
				<div>
					<h3>Turimi pixeliai: {this.props.data && this.props.data.meta && this.props.data.meta.active_pixels ? this.props.data.meta.active_pixels : 0}</h3>
				</div>
				<div>
					<h3>Vartotojas: {this.props.data.attributes.username}</h3>
				</div>
				{ this.state.showQr ?
					<Qrread  callToInfo={this.callFromQr} /> : ''
				}

			</div>
		);
	}
}
