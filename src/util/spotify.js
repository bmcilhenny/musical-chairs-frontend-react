import Cookies from 'universal-cookie';
import QueryString from 'querystring';

const setupSpotify = spotify => {
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
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const scopes = encodeURIComponent(
      'user-read-playback-state user-modify-playback-state'
    );
    const redirect_uri = window.location.href;
    debugger;
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scopes}&redirect_uri=${redirect_uri}`;
    window.location = url;
  }
};

export default { setupSpotify };