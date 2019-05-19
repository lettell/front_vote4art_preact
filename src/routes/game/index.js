import { h, Component } from 'preact';

import Board from '../../components/board';

export default class Game extends Component {
	constructor() {
		super();
		this.userStata = this.resolveState();
		
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

				return	this.setState({ dialogContent: 'game' });

			}
		}
	}
	render({ x, y, zoom }) {
		return (
			 <div class="container_main">
				<Board x={x} y={y} zoom={zoom} />
			</div>
		);
	}
}
