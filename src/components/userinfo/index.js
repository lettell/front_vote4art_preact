import { h, Component } from 'preact';

import style from './style.scss';

export default class Userinfo extends Component {

	constructor() {
		super();
		this.params = {
			lat: 0,
			long: 0,
			hash: null
		};
	}

	componentDidMount(props) {
	}
	render(props) {
		return (
			<div class={style.container}>
				<div>
					<h3>Turimi pixeliai: {(this.props.data.pixels)}</h3>
				</div>
				<div>
					<h3>Vartotojas: {this.props.data.username}</h3>
				</div>
				{/* { this.state.showQr ?
					<Qrread  callToInfo={this.callFromQr} /> : ''
				} */}

			</div>
		);
	}
}
