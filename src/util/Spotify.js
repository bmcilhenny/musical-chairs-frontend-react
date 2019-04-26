import Cookies from 'universal-cookie';
import QueryString from 'querystring';
import { cleanPlaylistData } from './DataCleaner';

export const setupSpotify = spotify => {
  const cookies = new Cookies();

  // Get access token from Spotify implicit grant flow redirect callback, and set cookie
  if (window.location.hash.length > 1) {
    const querystring = window.location.hash.slice(1);
    const query = QueryString.parse(querystring);
    if (query.access_token) {
      cookies.set('spotify-access-token', query.access_token, { maxAge: 3595 });
      // Final redirect to remove the hash, not really necessary, but url looks nicer
      window.location = window.location.href.split('#')[0];
    }
  }

  // Get token from cookie and use it to set up Spotify client, if not start the implicit grant flow
  const spotifyAccessToken = cookies.get('spotify-access-token');
  if (spotifyAccessToken) {
    spotify.setAccessToken(spotifyAccessToken);
  } else {
    const client_id = process.env.SPOTIFY_CLIENT_ID || '5f8edf6fa5254fb8ae8f9ff4839e8d4c';
    const scopes = encodeURIComponent('user-read-playback-state user-modify-playback-state playlist-read-private');
    const redirect_uri = window.location.href;
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scopes}&show_dialog=true&redirect_uri=${redirect_uri}`;
    window.location = url;
  }
};

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