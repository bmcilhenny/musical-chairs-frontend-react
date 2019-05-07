import React, {Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import {withRouter, Redirect} from 'react-router';
import Loadable from 'react-loadable';
 
const Login = Loadable({
  loader: () => import('./components/login/Login'),
  loading: () => null,
});

const Home = Loadable({
  loader: () => import('./components/home/Home'),
  loading: () => null,
});


class App extends Component {

  render() {
    return (
          <Switch>
            <Route exact path='/login' render={(routerProps) => < Login {...routerProps} />} />
            <Route exact path='/home' render={(routerProps) =>  <Home {...routerProps} /> } />
            <Route path='*' render={() => <Redirect to='/home' />} />
          </Switch>
    )

  }
}

export default withRouter(App);