import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';
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
