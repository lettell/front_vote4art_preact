import { h, Component } from 'preact';
// import { route } from 'preact-router';
import style from './style';
import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Elevation/style.css';
import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import CirclePicker from 'react-color/lib/Circle';
import HuePicker from 'react-color/lib/Hue';

export default class Colors extends Component {
	constructor() {
		super();
		this.colors = localStorage.userColors ? JSON.parse(localStorage.userColors) : ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ffffff', '#ff5722', '#000000', '#607d8b'];
		this.openColorPicker = this.openColorPicker.bind(this);
		this.setColorEvent = this.setColorEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSetColor = this.handleSetColor.bind(this);

	}
	handleSetColor(color, event) {
		let c = this.colors.indexOf(this.state.currentCollor);
		this.colors[c] = color.hex;
		this.setState({ currentCollor: color.hex, openColors: true });
		localStorage.setItem('userColors', JSON.stringify(this.colors));
		const params = { color: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` };
		this.props.callbackFromBoard(params);
	}
	handleChange(color, event) {
		const params = { color: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` };
		this.setState({ openColors: false, currentCollor: color.hex });
		this.props.callbackFromBoard(params);
	}
	
	
	openColorPicker(e) {
		const currentCollor = e.target.title;
		this.setState({ openColors: true, ...{ currentCollor } });
	}

	setColorEvent(){
		let colors = this.base.querySelectorAll('div[title^="#"]');
		colors.forEach((e, i) => {
			if (i < 14) e.addEventListener('dblclick', this.openColorPicker);
		});
	}
	removeColorEvent(){
		let colors = this.base.querySelectorAll('div[title^="#"]');
		colors.forEach((e, i) => {
			if (i < 14) e.removeEventListener('dblclick', this.openColorPicker);
		});
	}
	componentWillUnmount() {
		this.removeColorEvent();
	}
	componentDidMount() {
		this.setColorEvent();
	}

	render(props) {
		return (
			<Elevation z={2} >
				<div class={style.color_picker}>
					<div class={this.state.openColors ? 'animated fadeInRight': 'none'} style="padding-right:1em;">
						<HuePicker
							color={this.state.currentCollor}
							direction="vertical"
							height="38vh"
							width="16px"
							onChangeComplete={this.handleSetColor}
						/>
					</div>
					<div>
						<CirclePicker
							color={this.state.currentCollor}
							onChange={this.handleChange}
							colors={this.colors}
							height="40vh"
							width="90px"
						/>
					</div>
				</div>
			</Elevation>
		);
	}
}

