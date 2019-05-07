import { cleanPlaylistData } from './DataCleaner';
import { SCOPES, SPOTIFY_CLIENT_ID } from '../constants';

export const setUpSpotifyAuthorization = () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID || SPOTIFY_CLIENT_ID;
  const scopes = encodeURIComponent(SCOPES);
  const redirect_uri = window.location.href;
  const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scopes}&show_dialog=true&redirect_uri=${redirect_uri}`;
  window.location = url;
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
    throw new Error('Could not fetch playlist data, refresh and try again.')
  }
}