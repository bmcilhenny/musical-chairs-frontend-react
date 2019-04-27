import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { handleSpotifyToken } from '../../util/Spotify';
 
const withAuth = (WrappedComponent) => {
    const spotify = new Spotify();
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {}
          }
        
        componentDidMount() {
            handleSpotifyToken(spotify, this.props)
        }

        static getDerivedStateFromProps(nextProps, _) {
            handleSpotifyToken(spotify, nextProps)
            return null;
        }

        render() {
            return <WrappedComponent spotify={spotify} {...this.props} />
        }
    }
}

export default withAuth;