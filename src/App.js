import React, {Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import { Segment  } from 'semantic-ui-react';
import {withRouter, Redirect} from 'react-router';
import { setUpSpotifyAuthorization, handleRedirectResponse} from './util/Spotify';
import Loadable from 'react-loadable';
 
const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: () => null,
});

const Login = Loadable({
  loader: () => import('./components/Login'),
  loading: () => null,
});


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
    handleRedirectResponse(nextProps);
  }


  render() {
    return (
        <Segment inverted>
          <Switch>
            <Route exact path='/login' render={(routerProps) => < Login {...routerProps} handleLogin={this.handleLogin} />} />
            <Route exact path='/home' render={(routerProps) =>  <Home {...routerProps} handleLogout={this.handleLogout} /> } />
            <Route path='*' render={() => <Redirect to='/home' />} />
          </Switch>
        </Segment>
    )

  }
}

export default withRouter(App);