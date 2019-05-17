import React, {Fragment } from 'react';
import {Dropdown} from 'semantic-ui-react';

const DropdownWithOptions = (props) => {
    return (
      <Fragment>
        <Dropdown
          disabled={props.disabled}  
          onChange={props.handleChange}
          placeholder={props.placeholder} 
          fluid 
          selection 
          options={props.options}
          value={props.value}
        />
      </Fragment>
    )
}

export default DropdownWithOptions;
