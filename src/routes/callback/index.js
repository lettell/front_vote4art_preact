import { Component } from 'preact';
import { setIdToken, setAccessToken } from '../../utils/auth-service';

export class Callback extends Component {

  componentDidMount() {
    // setAccessToken();
    // setIdToken();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}