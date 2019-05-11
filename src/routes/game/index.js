import { h, Component } from 'preact';

import Board from '../../components/board';

export default class Game extends Component {
	render() {
		return (
			 <main>
				<Board />
			</main>
		);
	}
}
