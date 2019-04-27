import React, {Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import { Segment  } from 'semantic-ui-react';
import Home from './components/Home'
import Login from './components/Login'
import QueryString from 'querystring';
import {withRouter} from 'react-router';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  
  handleLogin = () => {
    const client_id = process.env.SPOTIFY_CLIENT_ID || '5f8edf6fa5254fb8ae8f9ff4839e8d4c';
    const scopes = encodeURIComponent('user-read-playback-state user-modify-playback-state playlist-read-private');
    const redirect_uri = window.location.href;
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scopes}&show_dialog=true&redirect_uri=${redirect_uri}`;
    window.location = url;
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/login')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (window.location.hash.length > 1) {
      const querystring = window.location.hash.slice(1);
      const query = QueryString.parse(querystring);
      if (query.access_token) {
        localStorage.setItem('spotify-access-token', JSON.stringify({token: query.access_token, expires: Date.now()}));
        nextProps.history.push('/home')
      }
    }
    return null;
  }


  render() {
    return (
        <Segment inverted>
          <Switch>
            <Route exact path='/login' render={(routerProps) => < Login {...routerProps} handleLogin={this.handleLogin} />} />
            <Route exact path='/home' render={(routerProps) =>  <Home {...routerProps} handleLogout={this.handleLogout} /> } />
            <Route path='*' render={(routerProps) =>  <Home {...routerProps}/> } />
          </Switch>
        </Segment>
    )

  }
}

export default withRouter(App);