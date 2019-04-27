import React, {Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import { Segment  } from 'semantic-ui-react';
import Home from './components/Home'
import Login from './components/Login'
import QueryString from 'querystring';
import {withRouter} from 'react-router';
import { setUpSpotifyAuthorization} from './util/Spotify';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  
  handleLogin = () => {
    setUpSpotifyAuthorization()
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