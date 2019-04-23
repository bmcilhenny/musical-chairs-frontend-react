import React from 'react';
import {Menu, Button } from 'semantic-ui-react';

const Navbar = (props) => {
    return (
        <Menu inverted pointing secondary>
            <Menu.Item 
                name='home'
                href="http://localhost:3000/" 
            />
            <Menu.Item
                name='docs'
            />
            <Menu.Item
                name='github'
                href='https://github.com/bmcilhenny/musical-chairs-frontend-react'
            />
            <Menu.Menu position='right'>
            <Button color='green'>Randomize</Button>
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;