import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import * as Util from '../../util/Spotify';
 
const withAuth = (WrappedComponent) => {
    const spotify = new Spotify();
    Util.setupSpotify(spotify);
    return class extends Component {
        
        componentDidMount() {
            debugger;
            const token = localStorage.getItem('spotify-access-token');
            if (!token) {
                this.props.history.push('/login')
            } else {
                spotify.setAccessToken(token)
            }
        }

        render() {
            return <WrappedComponent spotify={spotify} {...this.props} />
        }
    }
}

export default withAuth;