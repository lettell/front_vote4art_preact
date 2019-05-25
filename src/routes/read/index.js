import { h, Component } from 'preact';
import QrReader from 'react-qr-reader'
import 'preact-material-components/Card/style.css';
// import 'preact-material-components/Button/style.css';
import style from './style';
import route from 'preact-router';
export default class Read extends Component {
	constructor() {
		super();
		this.state = {
			result: ''
		}

	}
	handleScan = data => {
    if (data) {
			const h = data.slice(30);
			route(`/ba${h}`)
    }
  }
  handleError = err => {
    console.error(err)
  }
	
	render() {
		return (
			<div class={`${style.home} page`}>
			<div class={style.container}>
					<QrReader
						delay={300}
						onError={this.handleError}
						onScan={this.handleScan}
						style={{ width: '100%' }}
					/>
				</div>
        <p>{this.state.result}</p>
			</div>
		);
	}
}
