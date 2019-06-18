import React from 'react';
import {Dropdown} from 'semantic-ui-react';

const DropdownWithOptions = ({disabled, handleChange, placeholder, options, value}) => {
    return (
        <Dropdown
          fluid 
          selection 
          disabled={disabled}  
          onChange={handleChange}
          placeholder={placeholder} 
          options={options}
          value={value}
        />
    )
}

export default DropdownWithOptions;
