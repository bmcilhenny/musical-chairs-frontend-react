export const cleanPlaylistData = playlists => {
    const cleanedPlaylists = playlists.map(playlist => (
        {
        name: playlist.name, 
        imageUrl: playlist.images.length ? playlist.images[0].url : 'https://profile-images.scdn.co/images/userprofile/default/466b0f566b616665e15b15eac8685e4e29e2291f',
        id: playlist.id,
        uri: playlist.uri,
        total: playlist.tracks.total
        }
    ))
    return cleanedPlaylists;
}

export const cleanPlaybackErrorMessage = (err, modalMessage)  => `${JSON.parse(err.response).error.message}! ${modalMessage}.`;
