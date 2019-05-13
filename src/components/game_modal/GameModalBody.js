import React, {Fragment} from 'react';
import {Transition, Image, Header } from 'semantic-ui-react';


const GameModalBody = ({playlist, shuffleAnimation, gameStatus, currentTrack, action}) => {
    switch (gameStatus) {
        case 'before':
            return (
                <Fragment>
                        <Image 
                            centered 
                            size='small' 
                            src={playlist.imageUrl} 
                            label={gameStatus === 'play' ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
                        />
                    <Header as='h3'>
                        <Header.Content>
                            {playlist.name}
                            <Header.Subheader>Your Selected Playlist</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Fragment>
            )
        case 'shuffle':
            return (
                <Fragment>
                    <Transition animation='shake' duration={6000} visible={action}>
                        <Image 
                            centered 
                            size='small' 
                            src={playlist.imageUrl} 
                            label={gameStatus === 'play' ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
                        />
                    </Transition>
                    <Header as='h3'>
                        <Header.Content>
                            {playlist.name}
                            <Header.Subheader>Shuffling Your Selected Playlist</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Fragment>
            )
        case 'dance':
            return (
                <Fragment>
                    <Transition animation='swing up' duration={1000} visible={action}>
                        <Image 
                            centered 
                            size='small' 
                            src={currentTrack.item.imageUrl} 
                            label={gameStatus === 'dance' ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
                        />
                    </Transition>
                    <Header as='h3'>
                        <Header.Content>
                            {playlist.name}
                            <Header.Subheader>Your selected Playlist</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Fragment>
            )
        case 'paused':
            return (
                <Fragment>
                    <Image 
                        centered 
                        size='small' 
                        src={currentTrack.item.imageUrl} 
                        label={gameStatus === 'dance' ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
                    />
                    <Header as='h3'>
                        <Header.Content>
                            {playlist.name}
                            <Header.Subheader>Your selected Playlist</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Fragment>
            )
        case 'drink':
            return (
                <Fragment>
                    <Transition animation='fly down' duration={1000} visible={action}>
                        <Header as='h1'>
                            <Header.Content>
                                DRINK
                            </Header.Content>
                        </Header>
                    </Transition>
                </Fragment>
            )
        case 'gameOver':
            return (
                <Fragment>
                    <Transition animation='fly down' duration={1000} visible={action}>
                        <Header as='h1'>
                            <Header.Content>
                                GAME OVER
                            </Header.Content>
                        </Header>
                    </Transition>
                </Fragment>
            )
        case 'error':
            return (
                <Fragment>
                    <Transition animation='fly down' duration={1000} visible={action}>
                        <Header as='h1'>
                            <Header.Content>
                                ERROR
                            </Header.Content>
                        </Header>
                    </Transition>
                </Fragment>
            )
        default:
            return (
                <Header>Default</Header>
            )
    }
}

export default GameModalBody;