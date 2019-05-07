import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import { tokenExpired } from '../../helpers'
 
const withAuth = (WrappedComponent) => {
    const spotify = new Spotify();
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = { authorized: false}
          }
        
        componentDidMount() {
            debugger;
            let spotifyAccessToken = JSON.parse(localStorage.getItem('spotify-access-token'));
            if (spotifyAccessToken) {
                const {token, expires} = spotifyAccessToken;
                if (!(tokenExpired(expires))) {
                    spotify.setAccessToken(token)
                    this.setState({authorized: true})
                }
            }
        }

        static getDerivedStateFromProps(nextProps, _) {
            let spotifyAccessToken = JSON.parse(localStorage.getItem('spotify-access-token'));
            if (spotifyAccessToken) {
                const {token, expires} = spotifyAccessToken;
                if (!(tokenExpired(expires))) {
                    spotify.setAccessToken(token)
                    return { authorized: true };
                } else {
                    return { authorized: false };
                }
            } else {
                return { authorized: false };
            }
        }

        render() {
            return this.state.authorized ? <WrappedComponent spotify={spotify} {...this.props} /> : <Redirect to='/login' />
        }
    }
}

export default withAuth;