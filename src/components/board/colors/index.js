import { h, Component } from 'preact';
// import { route } from 'preact-router';
import style from './style';
import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Elevation/style.css';
import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import CirclePicker from 'react-color/lib/Circle';

export default class Colors extends Component {
	constructor() {
		super();
		this.colors = [];
		this.setColor = this.setColor.bind(this);
	}
	getRandomRgb() {
		const num = Math.round(0xffffff * Math.random());
		const r = num >> 16;
		const g = num >> 8 & 255;
		const b = num & 255;
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}
	
	generateColors() {
		for (let i = 0; i < 24; i++) {
			this.colors.push(this.getRandomRgb());
		}
	}

	setColor(e) {
		let color = this.state.color === e.target.dataset.color ? null : e.target.dataset.color;
		this.setState({ color });
		this.props.callbackFromBoard(this.state);
	}

	componentWillMount() {
		this.generateColors();
	}
	
	render(props) {
		return (
      	<CirclePicker />
		);
	}
}

