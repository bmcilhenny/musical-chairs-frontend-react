import React from 'react';
import { Modal, Header, Transition } from 'semantic-ui-react';
import { cleanArtistNames } from '../../util/DataCleaner';
import ErrorMessage from '../errors/ErrorMessage';

const animations = {
    shuffle: {
      enter: {
        animation: 'horizontal-flip',
        duration: 1000
      },
      exit: {
        animation: 'horizontal-flip',
        duration: 1000
      }
    },
    dance: {
        enter: {
          animation: 'horizontal-flip',
          duration: 1000
        },
        exit: {
          animation: 'horizontal-flip',
          duration: 1000
        }
      },
    paused: {
        enter: {
            animation: 'horizontal-flip',
            duration: 1000
        },
        exit: {
            animation: 'horizontal-flip',
            duration: 1000
        }
    },
    error: {
        enter: {
            animation: 'fly down',
            duration: 1000
        },
        exit: {
            animation: 'fly down',
            duration: 1000
        }
    },
    before: {
        enter: {
            animation: 'jiggle',
            duration: 1000
        },
        exit: {
            animation: 'jiggle',
            duration: 1000
        }
    }

}

// actionShuffle should be flipped when the playback has changed, aka when the play response has returned nothing back aka successful
const GameModalHeader = ({gameStatus, shuffleCountdown, currentTrack, action, error}) => {

    switch (gameStatus) {
        case 'before':
            return (
                <Transition animation='jiggle' duration={1000} visible={true} >
                    <Modal.Header as='h2'>
                        Set up your game below
                    </Modal.Header>
                </Transition>
            )
        case 'shuffle':
            const animate = Math.parse(shuffleCountdown) % 2 === 0 ? true : false;
            return (
                <Transition animation='jiggle' duration={1000} visible={animate} >
                    <Modal.Header as='h2'>
                        {shuffleCountdown}
                    </Modal.Header>
                </Transition>
            )
        case 'dance':
            return (
                <Transition animation='horizontal flip' duration={1000} visible={action} >
                    <Header as='h3'>
                        <Header.Content>
                            Now Playing {currentTrack.item.name}
                            <Header.Subheader>by {cleanArtistNames(currentTrack)}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Transition>
            )
        case 'paused':
            return (
                <Transition animation='horizontal flip' duration={1000} visible={action} >
                    <Header as='h1'>
                        <Header.Content>
                            Paused
                        </Header.Content>
                    </Header>
                </Transition>
            )
        case 'gameOver':
            return (
                <Transition animation='horizontal flip' duration={1000} visible={action} >
                    <Header as='h1'>
                        <Header.Content>
                            Thanks for guzzling
                        </Header.Content>
                    </Header>
                </Transition>
            )
        case 'error':
            return (
                <Transition animation='fly down' duration={1000} visible={action} >
                    <ErrorMessage error={error} />
                </Transition>
            )
        default: 
            return <Modal.Header as='h1'></Modal.Header>
    }
}

export default GameModalHeader;