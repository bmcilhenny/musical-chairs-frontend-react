import React from 'react';
import { Icon } from 'semantic-ui-react';

const PlaylistCounter = ({playlists}) => {
    return (
        <div style={{display: 'inline-block'}}>
          {playlists.length} total playlists
          <Icon name='bolt' />
        </div>
    )
}

export default React.memo(PlaylistCounter);