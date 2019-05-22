import { h, Component } from 'preact';

import style from './style';

export default class Eu extends Component {
	render() {
		return (
			<article>
				<p>Iš anksto balsuoti galite gegužės 20–24  dienomis visose Lietuvos savivaldybėse. Gegužės 26 d. balsuoti galite bet kurioje Lietuvos rinkimų apylinkėje (nuo 7 iki 20 val.).
				</p>
				<p>
				Savivaldybių ir apylinkių žemėlapį galite rasti čia <a href="https://www.arcgis.com/apps/webappviewer/index.html?id=73a48b6892c340bf9399c4dd14feb92e&extent=1756927.6933%2C6956994.13%2C3635444.1005%2C7793520.9675%2C102100" target="_blank" >
				čia
					</a>
				</p>
			</article>
		);
	}
}
