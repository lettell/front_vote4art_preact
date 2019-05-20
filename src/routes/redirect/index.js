import { Component } from 'preact';
import { route } from 'preact-router';

export default class Redirect extends Component {
  componentWillMount() {
    return route('/')
  }

  render() {
    return null;
  }
}