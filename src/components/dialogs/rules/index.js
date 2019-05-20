import { h, Component } from 'preact';

import style from './style';

export default class Rules extends Component {
	render() {
		return (
			<div>
				<p>Sukurkime Lietuvos dydžio mozaiką!</p>
				<p>
					Taisyklės paprastos: užsiregistruokite, gaukite pikselių ir sukurkite Lietuvos dydžio piešinį. Ateikite balsuoti į Europos Parlamento rinkimus, skenuokite apylinkėse esančius QR kodus esančius ant Vote4Art plakatų ir gaukite dar daugiau pikselių!
					</p>
					<p>
							O svarbiausia taisyklė paskutinė - išreiškite savo nuomonę Europos Parlamento rinkimuose ir formuokite ne tik mozaiką, bet ir Europos ateitį!
					</p>					
			</div>
		);
	}
}
