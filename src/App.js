import React, {Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import { Segment  } from 'semantic-ui-react';
import Home from './components/Home'
import Login from './components/Login'
import {withRouter, Redirect} from 'react-router';
import { setUpSpotifyAuthorization, handleRedirectResponse} from './util/Spotify';
import DynamicImport from './components/hocs/DynamicImport';


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