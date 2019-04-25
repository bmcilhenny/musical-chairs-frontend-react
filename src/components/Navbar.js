import React from 'react';
import {Menu, Button, Popup } from 'semantic-ui-react';
import {BASE_URL} from '../constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// console.log('COOKIES???', cookies.remove('spotify-access-token'))

const Navbar = ({handleRandomize, loading}) => {
    return (
        <Menu inverted pointing secondary>
            <Menu.Item 
                name='home'
                href={BASE_URL} 
            />
            <Menu.Item
                name='about'
            />
            <Menu.Item
                name='github'
                href='https://github.com/bmcilhenny/musical-chairs-frontend-react'
            />
            <Menu.Menu position='right'>
                <Popup
                    trigger={<Button onClick={handleRandomize} loading={loading ? true : false} color='green'>Randomize</Button>}
                    content="Tryna play your luck? We'll select a random playlist for ya."
                    position='bottom right'
                />
                <Button secondary onClick={() => {
                    cookies.remove('spotify-access-token')
                    window.location.reload();
                }}>Log out</Button>
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;