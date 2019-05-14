import { h, Component } from 'preact';

import Board from '../../components/board';

export default class Game extends Component {
	render({x, y, zoom}) {
		return (
			 <div class="container_main">
				<Board x={x} y={y} zoom={zoom} />
			</div>
		);
	}
}
