import { cleanPlaylistData } from './DataCleaner';
import {tokenExpired} from '../helpers';

export const setUpSpotifyAuthorization = () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID || '5f8edf6fa5254fb8ae8f9ff4839e8d4c';
  const scopes = encodeURIComponent('user-read-playback-state user-modify-playback-state playlist-read-private');
  const redirect_uri = window.location.href;
  const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scopes}&show_dialog=true&redirect_uri=${redirect_uri}`;
  window.location = url;
}

export const handleSpotifyToken = (spotify, props) => {
  let spotifyAccessToken = JSON.parse(localStorage.getItem('spotify-access-token'));
  if (spotifyAccessToken) {
      const {token, expires} = spotifyAccessToken;
      if ((tokenExpired(expires))) {
          props.history.push('/login')
      } else {
          spotify.setAccessToken(token)
      }
  } else {
      props.history.push('/login')
  }
}


export const getPaginatedPlaylists = async (spotify, playlists, limit=50, offset=0) => {
  try {
    const resp = await spotify.getUserPlaylists({limit: limit, offset: offset})
    const retrievedPlaylists = playlists.concat(resp.items)
    if (resp.next !== null) {
      const url = new URL(resp.next);
      offset = parseInt(url.searchParams.get('offset')); 
      return getPaginatedPlaylists(spotify, retrievedPlaylists, limit, offset)
    } else {
      return cleanPlaylistData(retrievedPlaylists);
    }
  } catch (err) {
    throw new Error('There was an error fetching playlist data.', err)
  }
}