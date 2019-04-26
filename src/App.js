import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';
import { Segment  } from 'semantic-ui-react';
import Home from './components/Home'
import Login from './components/Home'
import withAuth from './components/hocs/withAuth';

const App = () => {
    return (
        <Segment inverted>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' render={() => <Home />} />
          </Switch>
        </Segment>
    )
}

export default withAuth(App);