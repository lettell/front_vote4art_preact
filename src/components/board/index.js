import { h, Component } from 'preact';
// import { route } from 'preact-router';
import panzoom from 'panzoom';
import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();
import { getPixels, postPixel } from '../../utils/vote4art-api';
import * as d3 from 'd3';

import Slider from 'preact-material-components/Slider';
import 'preact-material-components/Slider/style.css';
import Colors from './colors';
import style from './style';
import Controls from './controls';

export default class Board extends Component {
	// callback
	setColor(currentColor) {
		// if (!this.isEditable) return;
		this.setState(currentColor);
	}
	setZoom(zoom) {
		this.zoomController
			.smoothZoom(zoom.cx, zoom.cy, zoom.zoomBy);
	}
	setGrid(grid) {
		this.setState({ grid });
	}

	// functions

	constructor() {
		super();

		this.getCord = this.getCord.bind(this);
		this.setColor = this.setColor.bind(this);
		this.putPixel = this.putPixel.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.transform = this.transform.bind(this);
		this.loadPixels = this.loadPixels.bind(this);
		this.setZoom = this.setZoom.bind(this);
		this.setGrid = this.setGrid.bind(this);

		this.scaledPixel = 1000;
		this.scaledX = 499;
		this.scaledY = 499;
		this.pixelPoint = [0, 0];
		this.mousePosition = [0, 0]
	}
	
	initZoom(elm) {
		let pan = panzoom(elm,
			{
				maxZoom: 100,
				minZoom: 0.1
			}
		);
		pan.zoomAbs(
			this.currentZoom.x, // initial x position
			this.currentZoom.y, // initial y position
			0.3 // initial zoom
		);
		pan.on('transform', this.transform);
		this.setState({ zoom: 'ok' });
		this.zoomController = pan;
	}
	// pervadinti i zoom
	transform(e) {
		let position = e.getTransform();
		this.scaledPixel = Math.floor(1000 * position.scale);
		this.scale = position.scale;
		this.scaledX = position.x;
		this.scaledY = position.y;
		this.setState({ transforming: true });
	}
	
	mouseMove(e) {
		if (!this.state.color) return;
		console.log(e)
		this.mousePosition = [e.clientX, e.clientY];
		console.log(	this.mousePosition)
		this.setState({nouseMove: true})
	}
	
	getCord(e) {
		if ( e.clientX === undefined ) {
			e = e.changedTouches[0];
		}
		this.pixelPoint = [Math.floor((e.clientX - this.scaledX)  / this.scale), Math.floor((e.clientY - this.scaledY)  / this.scale)];
		this.setState({ pixelPoint: [Math.floor((e.clientX - this.scaledX)  / this.scale), Math.floor((e.clientY - this.scaledY)  / this.scale)] });
		this.putPixel();
	}

	loadPixels() {
		getPixels().then(resp => {
			this.setState({ activePixels: 'loaded' });
			if (resp.data && resp.data.length){
				this.setAllPixels(resp.data);
				this.currentPhoto = `https://nuotraukos.vote4art.eu/${resp.meta.photo}` 
				this.setState({
					currentPhoto: resp.meta.photo
				});
			}
		}
		).catch(e => console.error(e.error));
	}

	setAllPixels(arr) {
		this.svg =d3.select('#voteForArt');
		arr.forEach(element => {
			this.svg.append('svg:rect')
				.attr('width', 1)
				.attr('height', 1)
				.attr('fill', element.attributes.color)
				.attr('x', element.attributes.x)
				.attr('y', element.attributes.y);
		});
		this.setState({ activePixels: 'placed_on_board' });
	}

	putPixel() {
		if (!this.state.color) return;
		if (this.pixelPoint[0] < 0 || this.pixelPoint[0] > 1000 ) return;
		if (this.pixelPoint[1] < 0 || this.pixelPoint[1] > 1000) return;
		// this.zoomController.pause();
		this.svg =d3.select('#voteForArt');
		this.svg.append('svg:rect')
			.attr('width', 1)
			.attr('height', 1)
			.attr('fill', this.state.color)
			.attr('x', this.pixelPoint[0])
			.attr('y', this.pixelPoint[1]);

		postPixel(this.pixelPoint, this.state.color).then( resp => {
			if (resp.data && resp.data.length){
				this.setAllPixels(resp.data);
				if (this.currentPhoto !== `https://nuotraukos.vote4art.eu/${resp.meta.photo}` ){
					this.setState({ photoUpdate: resp.meta.photo});
					this.currentPhoto =  `https://nuotraukos.vote4art.eu/${resp.meta.photo}`
				}

			}
		});
	}

	componentWillMount() {
		this.pixelPoint = [0, 0];

		// 	this.WX = document.body.clientWidth;
		// 	this.WY = document.body.clientHeight;
		// this.WX = this.WX / 2;
		// this.WY = this.WY / 2;

	}

	componentDidMount() {
		const b = this.base.querySelector('#voteForArt');
		const a = this.base.querySelector('#gridArea');
		const m = this.base.querySelector('#gridArea');
		this.currentZoom = {
		 x: (this.base.clientWidth / 2) ,
		 y: (this.base.clientHeight / 2)
		};
		this.loadPixels();
		this.initZoom(b, this.currentZoom);
		a.addEventListener('mousemove', this.mouseMove);
		m.addEventListener('mousemove', this.mouseMove);

	}


	render(props) {
		return (
			<div class={style.wrap__board}>
				<div class={style.board__controlls}>
					<Controls callbackFromBoard={this.setZoom} callbackFromBoardSecond={this.setGrid} />
				</div>
				<div class={style.colors_controlls}>
					<Colors	callbackFromBoard={this.setColor}	/>
				</div>
				{/* <h1 style="background:white;position: fixed; top: 160px; z-index: 9999;">Pixel: x:{this.pixelPoint[0]}y:{this.pixelPoint[1]}</h1>
				<h1 style="background:white;position: fixed; top: 80px; z-index: 9999;">scale{this.scale}</h1> */}
				<div
					class={style.pixel__center}
					style={`
						display: ${ this.state.color ? '' : 'none'};
						top:${this.WY};
						left:${this.WX};
						transform:scale(${this.scale});
					`}
			 >
					 <span class={style.pixel} style={`	
						 background: ${this.state.color};
						 `}
					 />
				</div>
				<div
					style={`
						width:${ this.scaledPixel }px;
						height:${ this.scaledPixel }px;
						position: absolute;
						top: ${this.scaledY}px;
						left: ${this.scaledX}px;
						background-color: white;
					`}
				>
					{this.currentPhoto ? <img
						width={this.scaledPixel}
						height={this.scaledPixel}
						class="pixelated"
						src={this.currentPhoto}
					/> : ''}
				</div>
				 <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1000%" id="board" height="100%" >
					<defs>
						<pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
							{this.state.grid ?
								<path d="M 10 0.0 L 0 0 0 10" fill="none" stroke="grey" stroke-width="0.03" />:
							""}
						</pattern>
					</defs>
					 <g id="voteForArt" fill="none" >
						<rect
								fill="url(#smallGrid)"
								id="bgImage"
								width="1000"
								height="1000"
								x="0"
								y="0"
							/>

						</g>
					<g fill="none">
						<rect
							fill="url(#smallGrid)"
							id="gridArea"
							width={this.scaledPixel}
							height={this.scaledPixel}
							onTouchTap={this.getCord}
							x={this.scaledX}
							y={this.scaledY}
							style="cursor: pointer;"
						/>
							<rect
								fill={this.state.color}
								id="ghost"
								width={this.scale}
								height={this.scale}
								onTouchTap={this.getCord}
								x={Math.floor(this.mousePosition[0]-(this.scale/2))}
								y={this.mousePosition[1]-(this.scale/2)}
								style="position: absolute;pointer-events: none;"
							/>
				 </g>
				</svg>
			</div>
		);
	}
}
