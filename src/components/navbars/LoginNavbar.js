import React from 'react';
import { Link } from 'react-scroll';
import {Menu, Dropdown, Image, Header, Icon } from 'semantic-ui-react';
import { GITHUB_URL } from '../../constants';
import { setUpSpotifyAuthorization } from '../../util/Spotify';


const LoginNavbar = ({user, handleLogout}) => {
    return (
        <Menu attached='top' style={{backgroundColor: 'transparent'}} borderless inverted >
            <Menu.Item position='left' >
                <Header as='h3' inverted >
                    <Icon name='beer'/> Musical Cheers
                </Header>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item name='home' href={'/home'} />
                <Menu.Item className='menuHover'>
                    <Link activeClass="active" to="About Section" spy={true} smooth={true} duration={1000}>
                        About
                    </Link>
                </Menu.Item>
                <Menu.Item name='github' href={GITHUB_URL} />
                {user.images ?
                    <Menu.Item>
                        <Image avatar src={user.images[0].url} />
                        <Dropdown text={user.display_name} pointing='top right'>
                            <Dropdown.Menu >
                                <Dropdown.Item text='Settings' />
                                <Dropdown.Item text='Log out' onClick={handleLogout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item> :
                    <Menu.Item name='log in' onClick={setUpSpotifyAuthorization} />
                 }
            </Menu.Menu>
        </Menu>   
    )
}

export default LoginNavbar;



