import { h, Component } from 'preact';

import Board from '../../components/board';

export default class Game extends Component {
	constructor() {
		super()
		this.userStata = this.resolveState();
		
	}
	resolveState() {
		let state;
		if (typeof window !== "undefined") { 		
			state = localStorage.userState;
		}
		else {
			state = -1;
		}
		switch (state) {
			case 0:
			case '0': {

				return this.setState({ userState: 'visited' });
			}
			case 1:
			case '1': {
				return this.setState({ userState: 'auhenticate' });
			}
			case 2:
			case '2': {
				return this.setState({ userState: 'active' });
			}
			case 3:
			case '3': {
				return this.setState({ userState: 'disconected' });
			}
			default: {
				if (typeof window !== "undefined") { 
					this.dialog.MDComponent.show();

					localStorage.setItem('userState', 0)
				 }

				return	this.setState({ dialogContent: 'game' });

			}
		}
	}
	render({x, y, zoom}) {
		return (
			 <div class="container_main">
				<Board x={x} y={y} zoom={zoom} />
			</div>
		);
	}
}
