import { Component } from 'preact';
// import { route } from 'preact-router';
import style from './style';


export default class Controls extends Component {
	constructor() {
		super();
		this.colors = [];
		this.setColor = this.setColor.bind(this);
	}
	
	render(props) {
		return (
			<div class={style.palete}>
					<h1>ok</h1>
			</div>
		);
	}
}

