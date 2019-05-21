import { h, Component } from 'preact';
import { NotificationManager } from 'react-notifications';
import { getReward } from '../../utils/vote4art-api';
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
	getReward(params) {
		getReward(params).then( rsp => {
			route('game/');
			NotificationManager.success("Ačiū, kad dalyvaujate")

		}).catch(e => {
			route('game/');
		});
	}
	checkAndSend = (hash) => {
		this.params.hash = hash;
		if (navigator.geolocation) {
			NotificationManager.info("Lokacijos patvirtinimas")
			navigator.geolocation.getCurrentPosition(this.showPosition);
		}
		else {
			NotificationManager.warn("Neveikia lokacija")
		}
	}
	// callFromQr = (data) => {
	// 	console.log(data);
	// }
	showPosition = (position) => {
		this.params = {
			lat: position.coords.latitude,
			long: position.coords.longitude,
			hash: this.params.hash.hash.slice(0, 8)
		};
		if (['9282c043', 'b357906c', 'bdb4defa'].includes(this.params.hash)) {
			this.getReward(this.params)
		} 
		else {
			// NotificationManager.info("Nuskaitykite qr koda")

			// this.setState({showQr: true})
		}
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
