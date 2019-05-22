import { h, Component } from 'preact';

import Board from '../../components/board';

export default class Game extends Component {
	constructor() {
		super();
		this.userStata = this.resolveState();
		if (typeof window !== 'undefined') {
			document.body.classList.add('noScroll');

		 }
	}

	checkFb() {
		FB.getLoginStatus((response) => {
		 this.statusChangeCallback(response);
	 });
	}

 statusChangeCallback = (response) => {
	 if (response.status === 'connected') {
		 this.props.callToApp({ logined: true, type: 'userState' });
		}
 }
 componentDidMount() {
	 this.checkFb();
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
 render({ callToApp, x, y, zoom }, state) {
	return (
	<div class="container_main">
		<Board  callToApp={this.props.callToApp} x={x} y={y} zoom={zoom} />
	</div>);
 }

}
