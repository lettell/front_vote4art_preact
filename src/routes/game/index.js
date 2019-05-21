import { h, Component } from 'preact';

import Board from '../../components/board';
import {facebookLogin} from '../../utils/auth-service';

export default class Game extends Component {
	constructor() {
		super();
		this.userStata = this.resolveState();
		if (typeof window !== "undefined") { 
			document.body.classList.add('noScroll');

		 }
		
		// FB.login(function (response) {
		// 	if (response.status === 'connected') {
		// 		FB.api('/me', function(response) {
		// 			facebookLogin({id: ""+response.id, name: response.name});
		// 		});
		// 	} else {
		// 		alert('nee')
		// 	}
		// });
		
	}
	resolveState() {
		let state;
		if (typeof window !== 'undefined') {
			state = localStorage.userState;
		}
		else {
			state = -1;
		}
		switch (state) {
			default: {
				if (typeof window !== 'undefined') {
					localStorage.setItem('userState', 0);
				}

				return this.setState({ dialogContent: 'game' });

			}
		}
	}
	render({ x, y, zoom }) {
		return (
			<div class="container_main">
				<Board callToApp={this.props.callToApp} x={x} y={y} zoom={zoom} />
			</div>
		);
	}
}
