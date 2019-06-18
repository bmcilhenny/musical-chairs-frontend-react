import React, { Fragment } from 'react';
import { Input, Icon } from 'semantic-ui-react';

const PlaylistFilter = ({filterString, handleChange}) => {
    return (
        <Fragment>
            <Input 
            icon={<Icon name='search' />} 
            placeholder="Search for a playlist"
            value={filterString}
            onChange={handleChange} />
        </Fragment>
    )
 }

 export default PlaylistFilter;