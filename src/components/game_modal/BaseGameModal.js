import React, { Fragment } from 'react';
import { Modal, Button, Header, Transition, Placeholder, Icon, Image, Container, Label } from 'semantic-ui-react';
import DropdownWithOptions from './DropdownWithOptions';
import { cleanArtistNames } from '../../util/DataCleaner';

const BaseGameModal = ({ gameStatus, ...props }) => {

    const components = {
        before: {
            header: 'Set up your game below',
            headerAnimation: { name: 'jiggle', duration: 1000, visible: props.animation },
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
            imageAnimation: { name: 'shake', duration: 6000, visible: props.shuffleAnimation },
            body: (
                <Fragment>
                    <Header.Subheader>Shuffling Your Selected Playlist</Header.Subheader>
                    {props.playlist.name}
                </Fragment>
            ),
            dropdown: (
                <Fragment>
                    <DropdownWithOptions
                        disabled={true}
                        options={props.numPlayerOptions}
                        placeholder='How many guzzlers will be guzzling this eve?'
                        handleChange={props.handlePlayersChange}
                        value={props.numPlayers}
                    />
                    <DropdownWithOptions
                        disabled={true}
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
        dance: {
            header: props.currentTrack.item ?
                (
                    <Fragment>
                        {props.currentTrack.item.name}
                        <Header.Subheader>by {cleanArtistNames(props.currentTrack)}</Header.Subheader>
                    </Fragment>
                ) : null
            ,
            imageUrl: props.currentTrack.item ? props.currentTrack.item.album.images[1].url : null,
            imageLabel: { as: 'a', color: 'green', corner: 'left', icon: 'pause' },
            body: (
                <Fragment>
                    {props.playlist.name ? props.playlist.name : null}
                    <Header.Subheader>Your Selected Playlist</Header.Subheader>
                </Fragment>
            ),
            roundsRemaining: props.roundsLeft === 1 ?
                <Label size='large' color='red'>The Last Round</Label> :
                (
                    <Fragment>
                        <Label circular color='green'>{props.roundsLeft}</Label>
                        <span>rounds remaining</span>
                    </Fragment>
                ),
            actions: (
                <Fragment>
                    <Button negative onClick={props.handleClose}>Cancel</Button>
                    <Button icon='pause' content=' Pause' onClick={() => props.handlePause(false)} />
                    <Button positive icon labelPosition='right' disabled={props.numPlayers && props.selectedDevice ? false : true} onClick={props.handleSkip} loading={props.loadingGame}>
                        Skip
                        <Icon name='angle double right' />
                    </Button>
                </Fragment>
            )
        },
        drink: {
            header:
                (<Fragment>
                    DRINK
                < Header.Subheader >Last one to flip their cup bites the dust</Header.Subheader >
                </Fragment >
                ),
            headerAnimation: { name: 'tada', duration: 1000, visible: props.animation },
            // i erase current track in handleNextRoundResponse, when that happens use the lastTrack's image 
            imageUrl: props.currentTrack.item ? props.currentTrack.item.album.images[1].url : props.lastTrack.item ? props.lastTrack.item.album.images[1].url : null,
            imageAnimation: { name: 'tada', duration: 1000, visible: props.animation },
            imageLabel: { as: 'a', color: 'green', corner: 'left', icon: 'beer' },
            body: (
                <Fragment>
                    {props.playlist.name ? props.playlist.name : null}
                    <Header.Subheader>Your Selected Playlist</Header.Subheader>
                </Fragment>
            ),
            roundsRemaining: props.roundsLeft === 1 ?
                <Label size='large' color='red'>The Last Round</Label> :
                (
                    <Fragment>
                        <Label circular color='green'>{props.roundsLeft}</Label>
                        <span>rounds remaining</span>
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
                        positive
                        icon
                        labelPosition='right'
                        disabled={true}
                        loading={props.loadingGame}
                    >
                        Skip
                    <Icon name='angle double right' />
                    </Button>
                </Fragment>
            )

        },
        paused: {
            header: props.currentTrack.item ? (
                <Fragment>
                    {props.currentTrack.item.name}
                    < Header.Subheader > by {cleanArtistNames(props.currentTrack)}</Header.Subheader >
                </Fragment >
            ) : null,
            imageUrl: props.currentTrack.item ? props.currentTrack.item.album.images[1].url : null,
            imageLabel: { as: 'a', color: 'green', corner: 'left', icon: 'play' },
            roundsRemaining: props.roundsLeft === 1 ?
                <Label size='large' color='red'>The Last Round</Label> :
                (
                    <Fragment>
                        <Label circular color='green'>{props.roundsLeft}</Label>
                        <span>rounds remaining</span>
                    </Fragment>
                ),
            body: (
                <Fragment>
                    {props.playlist.name ? props.playlist.name : null}
                    <Header.Subheader>Your Selected Playlist</Header.Subheader>
                </Fragment>
            ),
            actions: (
                <Fragment>
                    <Button negative onClick={props.handleClose}>Cancel</Button>
                    <Button icon onClick={props.handleResume}>
                        <Icon name='play' />
                        Resume
                </Button>
                    <Button
                        positive
                        icon
                        labelPosition='right'
                        disabled={props.numPlayers && props.selectedDevice ? false : true}
                        onClick={props.handleSkip}
                        loading={props.loadingGame}
                    >
                        Skip
                <Icon name='angle double right' />
                    </Button>
                </Fragment>
            )
        },
        gameOver: {
            header: (
                <Fragment>
                    Cheers to the Guzzler
                    < Header.Subheader >Game Over</Header.Subheader >
                </Fragment >
            ),
            imageUrl: props.lastTrack.item ? props.lastTrack.item.album.images[1].url : null,
            imageLabel: { as: 'a', color: 'green', corner: 'left', icon: 'beer' },
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
                        positive icon='question'
                        labelPosition='right'
                        content='Play Again'
                        disabled={props.numPlayers && props.selectedDevice ? false : true}
                        onClick={props.startRound}
                        loading={props.loadingGame}
                    />
                </Fragment>
            )
        },

    }

    const component = components[gameStatus];
    const componentHeaderAnimation = component.headerAnimation ? component.headerAnimation : { name: undefined, duration: undefined, visible: undefined }
    const componentImageAnimation = component.imageAnimation ? component.imageAnimation : { name: undefined, duration: undefined, visible: undefined }

    return (
        <Fragment>
            <Modal.Header>
                <Transition animation={componentHeaderAnimation.name} duration={componentHeaderAnimation.duration} visible={componentHeaderAnimation.visible} >
                    <Header textAlign='center' as='h1'>
                        {component.header}
                    </Header>
                </Transition>
            </Modal.Header>
            <Modal.Content>
                <Container textAlign='center'>
                    {props.imageLoaded ? null :
                        (<Placeholder style={{ height: 150, width: 150, margin: 'auto ' }}>
                            <Placeholder.Image />
                        </Placeholder>)
                    }
                    <div style={props.imageLoaded ? {} : { display: 'none' }}>
                        <Transition animation={componentImageAnimation.name} duration={componentImageAnimation.duration} visible={componentImageAnimation.visible}>
                            <Image centered size='small'
                                style={{ boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}
                                src={component.imageUrl}
                                onLoad={props.setImageLoaded}
                                label={component.imageLabel ? component.imageLabel : null} />
                        </Transition>
                    </div>
                    <Header as='h3'>
                        <Header.Content>
                            {component.body}
                        </Header.Content>
                    </Header>
                    {component.roundsRemaining ? component.roundsRemaining : null}
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