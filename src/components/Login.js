import React, {Component, Fragment} from 'react';
import { setUpSpotifyAuthorization } from '../util/Spotify';
import { Button } from 'semantic-ui-react';
import QueryString from 'querystring';


class Login extends Component {
    state = {}

    static getDerivedStateFromProps(nextProps) { 
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
            <Fragment>
                <Button positive onClick={setUpSpotifyAuthorization}>Login</Button>
            </Fragment>
        )
    }
}

export default Login;