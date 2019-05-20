import { Component } from 'preact';
import { route } from 'preact-router';

export default class Redirect extends Component {
  componentWillMount() {
    this.props.reloadUser(true);
  }

  render() {
    return null;
  }
}