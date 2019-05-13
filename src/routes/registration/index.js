import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/mdc-card.scss';
import style from './style';

export default class Registration extends Component {
	render() {
		return (
			<div class={`${style.home} page`}>
				<div>
					<Card>
						<div class="card-header">
							<h2 class=" mdc-typography--title">Title</h2>
							<div class=" mdc-typography--caption">Caption</div>
						</div>
						<Card.Media className="card-media" />
						<Card.Actions className="mdc-card__actions--full-bleed">
							<Card.ActionButtons>
								<Card.ActionButton>OK</Card.ActionButton>
							</Card.ActionButtons>
						</Card.Actions>
					</Card>
				</div>
			</div>
		);
	}
}
