import { Component } from 'preact';
// import { route } from 'preact-router';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import style from './style';

export default class Controls extends Component {

	zoom(e) {
		e.preventDefault();
		let container = document.body.querySelector('#bgImage');
		let rect = container.getBBox();
		let cx = rect.x + rect.width / 2;
		let cy = rect.y + rect.height / 2;
		let isZoomIn = e.target.id === 'zoomIn';
		let zoomBy = isZoomIn ? 2 : 0.5;
		let params = { cx, cy, zoomBy };
		this.props.callbackFromBoard(params);
	}
	grid(e) {
		this.setState({ grid: !this.state.grid });
		this.props.callbackFromBoardSecond(this.state.grid);

	}
	constructor() {
		super();
		this.zoom = this.zoom.bind(this);
		this.grid = this.grid.bind(this);

		this.state = {
			grid: false
		};
	}

	render(props) {
		return (
			<div class={style.container}>
				<Fab mini class={style.btn_grid} id="zoomIn" ripple raised onClick={this.zoom} >
					<Fab.Icon id="zoomIn">zoom_in</Fab.Icon>
				</Fab>
				<Fab mini class={style.btn_grid} id="zoomOut" ripple raised onClick={this.zoom} >
					<Fab.Icon >zoom_out</Fab.Icon>
				</Fab>
				<Fab mini class={style.btn_grid} ripple raised onClick={this.grid} >
					{this.state.grid ?
						<Fab.Icon>crop_square</Fab.Icon> :
						<Fab.Icon>border_all</Fab.Icon>}
				</Fab>
				{/* <Button ripple raised onClick={this.zoom} id="zoomOut">
					<Icon>zoom_out</Icon>
				</Button>
				<Button class={style.btn_grid} ripple raised onClick={this.zoom} id="zoomOut">
					<Icon>view_module</Icon>
				</Button> */}
			</div>

		);
	}
}

