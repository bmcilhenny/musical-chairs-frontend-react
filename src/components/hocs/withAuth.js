import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
 
const withAuth = (WrappedComponent) => {
    const spotify = new Spotify();
    return class extends Component {

        tokenExpired = (expires) => (Date.now - expires) > 3600000 ? true : false
        
        componentDidMount() {
            const {token, expires} = JSON.parse(localStorage.getItem('spotify-access-token'));
            debugger;
            if (token && !(this.tokenExpired(expires))) {
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