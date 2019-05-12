import { h, Component } from 'preact';

import Board from '../../components/board';

export default class Game extends Component {
	render({x, y, zoom}) {
		return (
			 <div>
				<Board x={x} y={y} zoom={zoom} />
			</div>
		);
	}
}
