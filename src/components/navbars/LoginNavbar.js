import React from 'react';
import { Link } from 'react-scroll';
import {Menu, Dropdown, Image, Header, Icon } from 'semantic-ui-react';
import { FINDING_NEMO_URL, GITHUB_URL } from '../../constants';


const LoginNavbar = () => {
    return (
        <Menu attached='top' style={{backgroundColor: 'transparent'}} borderless inverted >
            <Menu.Item position='left'>
                <Header as='h3' inverted >
                    <Icon name='beer' /> Musical Cheers
                </Header>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item name='home' href={'/login'} />
                <Menu.Item className='menuHover'>
                    <Link activeClass="active" to="About Section" spy={true} smooth={true} duration={1000}>
                        About
                    </Link>
                </Menu.Item>
                <Menu.Item name='github' href={GITHUB_URL} />
                <Menu.Item>
                    <Image avatar src={FINDING_NEMO_URL} />
                    <Dropdown text='Profile' pointing='top right'>
                        <Dropdown.Menu >
                            <Dropdown.Item text='Settings' />
                            <Dropdown.Item text='Log out' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu.Menu>
        </Menu>   
    )
}

export default LoginNavbar;



