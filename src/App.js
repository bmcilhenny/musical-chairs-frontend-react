import React, {Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import { Segment  } from 'semantic-ui-react';
import {withRouter, Redirect} from 'react-router';
// import { handleRedirectResponse} from './util/Spotify';
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

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   handleRedirectResponse(nextProps);
  // }


  render() {
    return (
        <Segment inverted>
          <Switch>
            <Route exact path='/login' render={(routerProps) => < Login {...routerProps} />} />
            <Route exact path='/home' render={(routerProps) =>  <Home {...routerProps} /> } />
            <Route path='*' render={() => <Redirect to='/home' />} />
          </Switch>
        </Segment>
    )

  }
}

export default withRouter(App);