import { h, Component } from 'preact';
// import { route } from 'preact-router';
import panzoom from 'panzoom';
import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();
import { getPixels, postPixel } from '../../utils/vote4art-api';

import Slider from 'preact-material-components/Slider';
import 'preact-material-components/Slider/style.css';
import Colors from './colors';
import style from './style';

export default class Board extends Component {
	// callback
	setColor(currentColor) {
		// if (!this.isEditable) return;
		this.setState(currentColor);
	}
	
		saveCallback = (reload) => {
			if (!this.isEditable) return;
		};


		// functions

		constructor() {
			super();
			this.getCord = this.getCord.bind(this);
			this.setColor = this.setColor.bind(this);
			this.putPixel = this.putPixel.bind(this);
			this.mousePosition = this.mousePosition.bind(this);

			this.scaledPixel = 1000;
			this.scaledX = 499;
			this.scaledY = 499;
			this.pixelPoint = [0, 0];

			this.windowCenter = {
				h: window.innerHeight/2,
				w: window.innerWidth/2
			};

		}
	
		initZoom(elm) {
			let pan = panzoom(elm,
				{
					maxZoom: 100,
					minZoom: 0.1
				}
			);
			pan.zoomAbs(
				0, // initial x position
				0, // initial y position
				1 // initial zoom
			);
			pan.on('transform', this.transform);
			this.setState({ zoom: 'ok' });
			this.zoomController = pan;
		}
	// pervadinti i zoom
	transform = (e) => {
		let position = e.getTransform();
		this.scaledPixel = Math.floor(1000 * position.scale);
		this.scale = position.scale;
		this.scaledX = position.x;
		this.scaledY = position.y;
		this.setState({ transforming: true });
	}
	
	mousePosition(e) {
		this.mPosition = [(Math.floor((e.clientX - this.scaledX) / this.scale)),( Math.floor((e.clientY - this.scaledY) / this.scale))];
		// console.log(`
		// 	bord X/Y: ${this.mPosition}
		// 	Client X/Y: ${e.clientX}, ${e.clientY}`);
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
			this.setState({activePixels: 'loaded'});
			if (resp.data && resp.data.length) this.setAllPixels(resp.data);
		}).catch(e => console.error(e.error));
	}
	async setAllPixels(arr) {
		let svg = document.getElementById('voteForArt');
		await arr.forEach(element => {
			let p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			p.setAttributeNS(null, 'width', 1);
			p.setAttributeNS(null, 'height', 1);
			p.setAttributeNS(null, 'x', element.attributes.x);
			p.setAttributeNS(null, 'y', element.attributes.y);
			p.setAttributeNS(null, 'fill', element.attributes.color);
			svg.appendChild(p);
		});
		this.setState({activePixels: 'placed_on_board'});
	}
	putPixel() {
		
		if (!this.state.color) return;
		let svg = document.getElementById('voteForArt');
		let p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		p.setAttributeNS(null, 'width', 1);
		p.setAttributeNS(null, 'height', 1);
		p.setAttributeNS(null, 'x', this.pixelPoint[0]);
		p.setAttributeNS(null, 'y',this.pixelPoint[1]);
		p.setAttributeNS(null, 'fill', this.state.color );
		svg.appendChild(p);
		console.log(`padetas x:${this.pixelPoint[0]}y:${this.pixelPoint[1]}spalva:${this.state.color}`)
		this.setState({ pixelPlaced: true });
		postPixel(this.pixelPoint, this.state.color)
	}

	// drawGrid(context) {
	// 	for (let x = 0.5; x < 10001; x += 10) {
	// 		context.moveTo(x, 0);
	// 		context.lineTo(x, 10000);
	// 	}
		
	// 	for (let y = 0.5; y < 10001; y += 10) {
	// 		context.moveTo(0, y);
	// 		context.lineTo(10000, y);
	// 	}
		
	// 	context.strokeStyle = '#ddd';
	// 	context.stroke();
	// }
	componentWillMount() {
		this.pixelPoint = [0, 0];
		if ( window.innerWidth ) {
			this.WX = window.innerWidth;
			this.WY = window.innerHeight;
		}
 		else {
			this.WX = document.body.clientWidth;
			this.WY = document.body.clientHeight;
		}
		this.WX = this.WX / 2;
		this.WY = this.WY / 2;
	}
	componentDidMount() {
		this.loadPixels();
		this.setState({ activeBoard: this.base.querySelector('#voteForArt') });
		this.initZoom(this.state.activeBoard);
		this.state.activeBoard.addEventListener('mousemove', this.mousePosition);

		// this.canvas = document.getElementById('voteForArt');
		// this.context = this.canvas.getContext('2d');
		// this.canvas.addEventListener('click', (evt) => {
		// 	let mousePos = this.getSquare(evt);
		// 	this.fillSquare(this.context, mousePos.x, mousePos.y);
		// }, false);
		// this.drawGrid(this.context);
		// this.context.fillStyle = "url('./assets/images/eye_output-fs8.png')";


	}


	render(props) {
		return (
			<div class={style.wrap__board}>
				<div class={style.board__controlls}>
					<Slider step={25} value={1} max={250} />
				</div>
				<div class={style.colors_controlls}>
					<Colors
						callbackFromBoard={this.setColor}
					/>
				</div>
				<h1 style="background:white;position: fixed; top: 160px; z-index: 9999;">Pixel: x:{this.pixelPoint[0]}y:{this.pixelPoint[1]}</h1>
				<h1 style="background:white;position: fixed; top: 80px; z-index: 9999;">scale{this.scale}</h1>
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
					`}
				>
					{/* <div class={style.board__grid} 
						style={`
							// display: ${ this.scale < 8 ? 'none' : 'block'};
							width:${ this.scaledPixel }px;
							height:${ this.scaledPixel }px;
							background-size: ${this.scale}px  ${this.scale}px;
						`}
					/> */}
					<img
						// width={this.scaledPixel}
						// height={this.scaledPixel}
						// class="pixelated"

						// src="/assets/images/eye_output-fs8.png"
					/>
				</div>
				 <svg width="1000%" id="board" height="100%" >
					<defs>
						<pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
							{this.state ? <path d="M 10 0.0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.01" />
						 :''}
						</pattern>
					</defs>
					 <g id="voteForArt" fill="url(#smallGrid)" >
						<rect
							id="test"
							width="1000"
							onTouchTap={this.getCord}
							height="1000"
							x="0"
							y="0"
							style="cursor: pointer;"
						/>
					 </g>
				</svg>
					
				 	{/* <canvas id="voteForArt" class={style.board__view} width="1000" height="1000" style="background: url('./assets/images/eye_output-fs8.png')" /> */}
				{/* persikelt pasku i component */}
				{/* <div class={style.board__scale} id="scaller" /> */}
				{/* <img
					class={style.board__view}

					id="viewer"
					src="/assets/images/eye_output-fs8.png"
				/> */}
			</div>
		);
	}
}
