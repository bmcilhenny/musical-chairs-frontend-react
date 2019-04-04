import React from 'react';
import { Icon } from 'semantic-ui-react';

const PlaylistCounter = (props) => {
    return (
        <div style={{display: 'inline-block'}}>
          {props.playlists.length} total playlists
          <Icon name='bolt' />
        </div>
    )
}

export default PlaylistCounter;