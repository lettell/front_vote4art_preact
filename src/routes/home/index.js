import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Home extends Component {
	constructor() {
		super();
		this.countDownDate = new Date("May 19, 2019 15:37:25").getTime();
		this.textTimer = [['sekundės', 'sekundė', 'sekundžių'],['minutės', 'minutė', 'minučių'],['valandos', 'valanda', 'valandų'], ['dienos', 'diena', 'dienų']];
		this.countDowown();
	}
	countDowown () {

		let x = setInterval(() =>{
		
			// Get todays date and time
			let now = new Date().getTime();
			let distance = this.countDownDate - now;
			let days = ('0'+ Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2)
			let hours = ('0'+ Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
			let minutes = ('0'+ Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
			let seconds = ('0'+ Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);
		  
			// Display the result in the element with id="demo"
			document.getElementById('countDown').innerHTML = days + ' / ' + hours + ' / '
			+ minutes + ' / ' + seconds ;
			
			
			document.getElementById('countText').innerHTML =  `${this.textTimer[3][this.resT(days)]} ${this.textTimer[2][this.resT(hours)]} ${this.textTimer[1][this.resT(minutes)]} ${this.textTimer[0][this.resT(seconds)]}`;
			
			// If the count down is finished, write some text 
			if (distance < 0) {
				clearInterval(x);
				document.getElementById('countDown').innerHTML = '';
			}
		}, 1000);
	}
	resT(e){
		let n = Number(e[1]);
		if (Number(e)  > 10 && Number(e)  < 20) n = 0;
		switch (n) {
			case 0:
			 return 2;
			case 1:
				return 1;
			default: return 0;
		}
	
	}
	
	render() {
		return (
			<div class={`${style.home} page`}>
				<div>
					<img class={style.logo} src="/assets/images/vote4art_logo.png" />

					<h1>Iki žaidimo pradžios liko:</h1>
					<Card class={style.timmer__block} >
						<h1 class={style.timmer} id="countDown" />
						<h1 class={style.timmer__text} id="countText">  diena valanda minutė sekundė</h1>
						<h1 class={style.timmer__text__mobile}>  d. val. min. sek.</h1>

					</Card>

				</div>


			</div>
		);
	}
}
