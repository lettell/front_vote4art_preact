import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class Game extends Component {
	render() {
		return (
			<div class={`${style.game} page`}>
				<div class={style.mapCanvas}>MAP CANVAS</div>
				<div class={style.pixel}>+</div>
			</div>
		);
	}
}
