import React from 'react';
import {Menu, Button, Popup } from 'semantic-ui-react';

const Navbar = ({handleRandomize}) => {
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
            <Popup
                trigger={<Button onClick={handleRandomize} color='green'>Randomize</Button>}
                content="Tryna play your luck? We'll select a random playlist for ya."
                position='bottom right'
            />
            
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;