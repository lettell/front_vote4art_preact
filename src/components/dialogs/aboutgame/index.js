import { h, Component } from 'preact';

import style from './style';

export default class Aboutgame extends Component {
	render() {
		return (
			<article>
				<p>	Sukurkime piešinį, tapsiantį mūsų istorijos dalimi ir gatvės meno kūriniu!</p>
				<p>
				Užsiregistruokite, gaukite pikselių ir pradėkite piešti. Nuo registracijos pradžios kas valandą gausite po vieną pikselį. Dienos pikselius galite kaupti (iki 48 per dieną), bet jų neišnaudojus iki tos dienos pabaigos, vidurnaktį pikseliai bus anuliuojami. Ieškokite bendraminčių pasirinkto piešinio įamžinimui ir koordinuokite veiksmus.
				</p>
				<p>Ateikite balsuoti į Europos Parlamento rinkimus, skenuokite balsavimo apylinkėse esančius QR kodus ant „Vote4Art“ plakatų ir gaukite dar daugiau pikselių. Taip prisidėsime prie Europos ateities kūrimo ir bendrai sukursime virtualų piešinį, kuris taps mūsų visų istorijos dalimi.
				</p>
			</article>

		);
	}
}
