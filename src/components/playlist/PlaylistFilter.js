import React, { Fragment } from 'react';
import { Input, Icon } from 'semantic-ui-react';

const PlaylistFilter = (props) => {
    return (
        <Fragment>
            <Input 
            icon={<Icon name='search' />} 
            placeholder="Search for a playlist"
            value={props.filterString}
            onChange={(text) => props.handleChange(text)} />
        </Fragment>
    )
 }

 export default PlaylistFilter;