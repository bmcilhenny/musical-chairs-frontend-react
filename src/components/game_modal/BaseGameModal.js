import React, { Fragment } from 'react';
import { Modal, Button, Header, Transition, Icon, Image, Container } from 'semantic-ui-react';
import DropdownWithOptions from './DropdownWithOptions';
import DanceGameModal from './game_modals/DanceGameModal';
import DrinkGameModal from './game_modals/DrinkGameModal';
import GameOverGameModal from './game_modals/GameOverGameModal';
import { cleanArtistNames } from '../../util/DataCleaner';

const BaseGameModal = ({ gameStatus, ...props }) => {
    const components = {
        before: {
            header: 'Set up your game below',
            imageUrl: props.playlist.imageUrl ? props.playlist.imageUrl : null,
            body: (
                <Fragment>
                    {props.playlist.name ? props.playlist.name : null}
                    <Header.Subheader>Your Selected Playlist</Header.Subheader>
                </Fragment>
            ),
            dropdown: (
                <Fragment>
                    <DropdownWithOptions
                        disabled={false}
                        options={props.numPlayerOptions}
                        placeholder='How many guzzlers will be guzzling this eve?'
                        handleChange={props.handlePlayersChange}
                        value={props.numPlayers}
                    />
                    <DropdownWithOptions
                        disabled={false}
                        options={props.deviceOptions}
                        placeholder='Select which device to stream music from..'
                        handleChange={props.handleDeviceChange}
                        value={props.selectedDevice}
                    />
                </Fragment>
            ),
            actions: (
                <Fragment>
                    <Button negative onClick={props.handleClose}>Cancel</Button>
                    <Button icon disabled={true}>
                        <Icon name='play' />
                        Resume
                </Button>
                    <Button
                        positive icon='checkmark'
                        labelPosition='right'
                        content='Start'
                        disabled={props.numPlayers && props.selectedDevice ? false : true}
                        onClick={props.startRound}
                        loading={props.loadingGame}
                    />
                </Fragment>
            ),
        },
        shuffle: {
            header: props.shuffleCountdown,
            imageUrl: props.playlist.imageUrl ? props.playlist.imageUrl : null,
            body: (
                <Fragment>
                    <Header.Subheader>Shuffling Your Selected Playlist</Header.Subheader>
                    {props.playlist.name}
                </Fragment>
            ),
            dropdown: (
                <Fragment>
                    <DropdownWithOptions
                        disabled={false}
                        options={props.numPlayerOptions}
                        placeholder='How many guzzlers will be guzzling this eve?'
                        handleChange={props.handlePlayersChange}
                        value={props.numPlayers}
                    />
                    <DropdownWithOptions
                        disabled={false}
                        options={props.deviceOptions}
                        placeholder='Select which device to stream music from..'
                        handleChange={props.handleDeviceChange}
                        value={props.selectedDevice}
                    />
                </Fragment>
            ),
            actions: (
                <Fragment>

                    <Button negative onClick={props.handleClose}>Cancel</Button>
                    <Button icon disabled={true}>
                        <Icon name='play' />
                        Resume
                </Button>
                    <Button
                        positive icon='random'
                        labelPosition='right'
                        content='Shuffling'
                        loading={true}
                    />
                </Fragment>
            )
        },
        dance: DanceGameModal,
        drink: DrinkGameModal,
        paused: {
            header: props.currentTrack.item ? (
                <Fragment>
                    {props.currentTrack.item.name}
                    < Header.Subheader > by {cleanArtistNames(props.currentTrack)}</Header.Subheader >
                </Fragment >
            ) : null,
            imageUrl: props.currentTrack.item ? props.currentTrack.item.album.images[1].url : null
        },
        gameOver: GameOverGameModal

    }

    const component = components[gameStatus];
    return (
        <Fragment>
            <Modal.Header>
                <Transition animation='jiggle' duration={1000} visible={props.animation} >
                    <Header textAlign='center' as='h1'>
                        {component.header}
                    </Header>
                </Transition>
            </Modal.Header>
            <Modal.Content>
                <Container textAlign='center'>
                    <Transition animation='shake' duration={6000} visible={props.shuffleAnimation}>
                        <Image centered size='small' src={component.imageUrl} />
                    </Transition>
                    <Header as='h3'>
                        <Header.Content>
                            {component.body}
                        </Header.Content>
                    </Header>
                    {component.dropdown ? component.dropdown : null}
                </Container>
            </Modal.Content>
            <Modal.Actions>
                {component.actions}
            </Modal.Actions>
        </Fragment>
    );
}

export default BaseGameModal;