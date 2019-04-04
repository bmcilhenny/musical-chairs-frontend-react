import React, {Fragment, Component } from 'react';
import {Dropdown} from 'semantic-ui-react';

const DropdownWithOptions = (props) => {
    return (
      <Fragment>
        <Dropdown  
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
