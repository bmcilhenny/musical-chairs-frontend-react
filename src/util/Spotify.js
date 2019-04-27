import { cleanPlaylistData } from './DataCleaner';

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