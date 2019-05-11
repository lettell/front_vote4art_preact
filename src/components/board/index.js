import { h, Component } from 'preact';
// import { route } from 'preact-router';
import panzoom from 'panzoom';
import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

import Slider from 'preact-material-components/Slider';
import 'preact-material-components/Slider/style.css';
import Colors from './colors'
import style from './style';

export default class Board extends Component {
		// callback
		setColor = (currentColor) => {
			// if (!this.isEditable) return;
			this.setState({currentColor})
		};
	
		saveCallback = (reload) => {
			if (!this.isEditable) return;
		};


		// functions

	constructor() {
		super();
		this.getCord = this.getCord.bind(this);
		this.setColor = this.setColor.bind(this);
		this.putPixel = this.putPixel.bind(this);

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
			500, // initial x position
			500, // initial y position
			1 // initial zoom
		);
		pan.on('transform', this.transform);
		this.setState({zoom: 'ok'})
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

	getCord(e) {
		let viewportOffset, x, y;
		if ( e.screenX === undefined ) {
			viewportOffset = document.querySelector('#test').getBoundingClientRect();
			x = e.changedTouches[0].screenX / this.scale;
			y = e.changedTouches[0].screenY / this.scale;
		}else{
		viewportOffset = e.target.getBoundingClientRect();
		x = e.screenX / this.scale;
		y = e.screenY / this.scale;
	}

		this.pixelPoint = [Math.floor(x+(~viewportOffset.x / this.scale)), (Math.floor(y+(~viewportOffset.y / this.scale)))];
		this.putPixel()
	}


	putPixel(){
		if (!this.state.currentColor) return;
		let svg = document.getElementById('voteForArt')
		let p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		p.setAttributeNS(null, 'width', 1);
		p.setAttributeNS(null, 'height', 1);

		p.setAttributeNS(null, 'x', this.pixelPoint[0]);
		p.setAttributeNS(null, 'y',this.pixelPoint[1]);

		p.setAttributeNS(null, 'fill', this.state.currentColor.color );
		svg.appendChild(p)

		this.setState({ pixelPlaced: true });

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
		this.setState({activeBoard: this.base.querySelector('#voteForArt')});
		this.initZoom(this.state.activeBoard);
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
					 style={`top:${this.WY} 
					 left:${this.WX};transform:scale(${this.scale})`}
				 >
					 <span class={style.pixel} />
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
				<img
					width={this.scaledPixel}
					height={this.scaledPixel}
					class='pixelated'

					src="/assets/images/eye_output-fs8.png"
				/>
				</div>
				 <svg width="1000" id="board" height="1000" >
					 <g id="voteForArt">
								 <rect id="test" width="100%"  onTouchTap={this.getCord} height="1000" x="0" y="0" style="cursor: pointer; fill:rgba(0,0,0,0);" />
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
