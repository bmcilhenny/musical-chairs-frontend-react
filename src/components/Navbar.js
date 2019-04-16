import React from 'react';
import {Menu, Button } from 'semantic-ui-react';

const Navbar = (props) => {
    return (
        <Menu inverted pointing secondary>
            <Menu.Item 
            name='home' 
                />
            <Menu.Item
            name='docs'
            />
            <Menu.Item
            name='github'
            />
            <Menu.Menu position='right'>
            <Button color='green'>Log Out</Button>
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;