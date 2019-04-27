import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import * as Util from '../../util/Spotify';
// import {withRouter} from 'react-router';
 
const withAuth = (WrappedComponent) => {
    const spotify = new Spotify();
    // Util.setupSpotify(spotify);
    return class extends Component {
        constructor(props) {
            super(props)
        }
        
        componentDidMount() {
            const token = localStorage.getItem('spotify-access-token');
            if (token) {
                spotify.setAccessToken(token)
            } else {
                this.props.history.push('/login')
            }
        }

        render() {
            return <WrappedComponent spotify={spotify} {...this.props} />
        }
    }
}

export default withAuth;