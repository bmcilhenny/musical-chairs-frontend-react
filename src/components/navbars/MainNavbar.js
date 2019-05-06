import React from 'react';
import {Menu, Button, Popup } from 'semantic-ui-react';
import {BASE_URL} from '../../constants';

const MainNavbar = ({handleRandomize, handleLogout, loading, loggedIn}) => {
    loggedIn = true;
    return (
        <Menu inverted pointing secondary>
            <Menu.Item 
                name='home'
                href={loggedIn ? BASE_URL : '/login'} 
            />
            <Menu.Item
                name='about'
            />
            <Menu.Item
                name='github'
                href='https://github.com/bmcilhenny/musical-chairs-frontend-react'
            />
            {loggedIn ?  
                (<Menu.Menu position='right'>
                    <Popup
                        trigger={<Button onClick={handleRandomize} loading={loading ? true : false} color='green'>Randomize</Button>}
                        content="Tryna play your luck? We'll select a random playlist for ya."
                        position='bottom right'
                    />
                    <Button secondary onClick={handleLogout}>Log out</Button>
                </Menu.Menu>) : null}
            
        </Menu>
    )
}

export default MainNavbar;