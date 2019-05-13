import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import { times } from 'lodash';
import PlaylistCard from '../playlist/PlaylistCard';
import BaseGameModal from './BaseGameModal';
import * as Helper from '../../helpers';
import {NAH_NAH_NAH_NAH_URI} from '../../constants';
import { sleep } from '../../helpers';

class GameModalContainer extends Component {

  static propTypes = {
    playlist: Proptypes.object.isRequired,
    index: Proptypes.number.isRequired,
    numPlayers: Proptypes.number.isRequired,
    handlePlayersChange: Proptypes.func.isRequired,
    handleDeviceChange: Proptypes.func.isRequired,
    selectedDevice: Proptypes.string.isRequired
  };

  constructor(props) {
      super(props)
      this.state = {
          modalOpen: false,
          shuffleCountdown: '',
          shuffleCountdownInterval: '',
          roundCountdown: '',
          roundCountdownInterval: '',
          shuffleAnimation: true,
          gameStatus: null,
          roundsLeft: undefined,
          error: '',
          timeouts: [],
          lastTrackURI: '',
          currentTrack: {},
          action: false
      }
  }

    defaultState = () => ({
        modalOpen: false,
        shuffleCountdown: '',
        shuffleCountdownInterval: '',
        roundCountdown: '',
        roundCountdownInterval: '',
        shuffleAnimation: true,
        gameStatus: null,
        roundsLeft: undefined,
        error: '',
        timeouts: [],
        lastTrackURI: '',
        currentTrack: {},
        action: false
    })

    componentWillUnmount() {
      clearInterval(this.state.shuffleCountdownInterval);
      clearInterval(this.state.roundCountdownInterval);
    }
    
    handleOpen = () => {
      this.setState({ modalOpen: true })
    }

    handleClose = () => {
      this.clearAllTimeouts();
      clearInterval(this.state.shuffleCountdownInterval);
      clearInterval(this.state.roundCountdownInterval);
      this.setState(this.defaultState());
    }

    numPlayerOptions = () => times(13, (i) => ({ key: i + 3, text: `${i + 3} guzzlers`, value: i + 3  }))
    deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))

    setShuffleState = () => {
      this.setState({
        shuffleAnimation: !this.state.shuffleAnimation,
        gameStatus: 'shuffle'
      })
    }

    setCountdown = (countdownType, initialVal) => {
      const countdownInterval = setInterval(() => this.tick(countdownType), 1000);
      this.setState({
        [countdownType]: initialVal,
        [`${countdownType}Interval`]: countdownInterval
      })
    }

    tick = (countdownType) => {
      const countdown = this.state[countdownType];
      const countdownInterval = this.state[`${countdownType}Interval`];
      if (countdown === 0 && countdownType === 'roundCountdown') {
        clearInterval(countdownInterval);
        this.handlePause(true);
      } else if (countdown === 0) {
        clearInterval(countdownInterval)
      } else {
        this.setState({
          [countdownType]: (countdown - 1)
        })
      }
    }

    clearAllTimeouts = () => {
      this.state.timeouts.forEach(timeout => clearTimeout(timeout))
    }

    setPlayState = (currentTrack, artistsNames) => {
      this.setState({
        modalMessage: `Now playing "${currentTrack.item.name}" by ${artistsNames}`,
        shuffleCountdown: 'GO!',
        gameStatus: 'play',
        currentTrackURI: currentTrack.item.uri
      })
    }

    handleSpotifyPlaybackError = (error, modalMessage) => {
      let parsedError = JSON.parse(error.response).error;
      if (parsedError.status === 401) {
        this.handleErrorState('Your Spotify token has expired. Refresh the page.');
      } else if (parsedError.status === 404) {
        this.handleErrorState(`${parsedError.message}! Make sure your device stays open for the duration of the game.`);
      } else {
          this.handleErrorState(modalMessage);
        }
    }

    handleErrorState = (modalMessage) => {
      this.setState({
          modalMessage: modalMessage, 
      })
    }

    handleShuffleResponse = (err, resp) => {
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an error shuffling, try again')
      } else {
        if (this.state.resuming) {
          this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlayResponse)
        } else {
          this.setShuffleState();
          this.setCountdown('shuffleCountdown', 5);
          let playTunesTimeout = setTimeout(() => this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlayResponse), 6000);
          this.setState(prevState => ({
            timeouts: [...prevState.timeouts, playTunesTimeout]
          }))
        }
      }
    }

    // responsible for updating the modal to show user what is being played
    handleGetCurrentPlaybackResponse = (err, currentTrack) => {
      console.log('Firing current playback response')
      console.log(this.state.lastTrackURI)
      console.log(this.state.currentTrackURI)
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an error getting your playback, try again');
      } else {
        debugger;
        const artists = currentTrack.item.artists;
        const artistsNames = artists.reduce((string, artist, i ) => {
          return string += artist.name + ((artists.length !== 1) && ((artists.length - 1) !== i) ? ', ' : '')
        }, '');
        this.setPlayState(currentTrack, artistsNames);
      }
    }

    handlePlayResponse = async (err, success) => {
      console.log(this.state.lastTrackURI)
      console.log(this.state.currentTrackURI)
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an unforseen error playing your chune. Close this modal and try again.');
      } else {
        const a = this.state.lastTrackURI
        const b = this.state.currentTrackURI
        const resuming = this.state.resuming
        debugger;
        if (this.state.lastTrackURI !== this.state.currentTrackURI) {
            this.setCountdown('roundCountdown', this.state.resuming ? this.state.roundCountdown : Helper.genRandomNumber(20, 10));
            this.setState({
              resuming: false,
              shuffleCountdown: 'GO!',
              gameStatus: 'play'
            });    
        }  else {
            await sleep(1000);
            // while the current playing track is not different than the last played track, getMyCurrentPlayingTrack()
            this.props.spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice}).then(currentTrack => {
              debugger;
              if (currentTrack.item.uri !== this.state.lastTrackURI) {
                const artists = currentTrack.item.artists;
                const artistsNames = artists.reduce((string, artist, i ) => {
                  return string += artist.name + ((artists.length !== 1) && ((artists.length - 1) !== i) ? ', ' : '')
                }, '');
                this.setPlayState(currentTrack, artistsNames);
                // set play state, set countdown, make sure resuming state is false
                this.setCountdown('roundCountdown', this.state.resuming ? this.state.roundCountdown : Helper.genRandomNumber(50, 10))
                this.setState({
                  resuming: false
                })
              } else if (this.state.resuming) {
                this.setCountdown('roundCountdown', this.state.resuming ? this.state.roundCountdown : Helper.genRandomNumber(50, 10))
                this.setState({
                  resuming: false
                })
              }
            });
        }
      }
    }

    handleNextRoundResponse = (err, success) => {
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an error setting up the next round, close this modal and try again.')
      } else {
        let startRoundTimeout = setTimeout(this.startRound, 11000);
        this.setState(prevState => {
          debugger;
          return ({
            timeouts: [...prevState.timeouts, startRoundTimeout],
            currentTrackURI: '',
            lastTrackURI: prevState.currentTrackURI
          }) 
        })
      }
    }

    startRound = () => {
      clearInterval(this.state.shuffleCountdownInterval);
      clearInterval(this.state.roundCountdownInterval);
      let roundsLeft = this.props.numPlayers - 1;
      if ((this.state.roundsLeft - 1) === 0) {
        this.setState({
          gameStatus: 'gameOver',
          modalMessage: 'Cheers to the guzzler!',
          roundsLeft: undefined,
          shuffleCountdown: 'GAME OVER'
        })
      } else {
        if (this.state.roundsLeft === undefined) {
          this.setState({
            roundsLeft
          })
        } else {
          this.setState(prevState => ({
            roundsLeft: prevState.roundsLeft - 1
          }))
        }
        this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handleShuffleResponse)
      } 
    }
  
    handleSkip = () => {
      clearInterval(this.state.roundCountdownInterval);
      this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handleShuffleResponse) 
    }

    handleResume = () => {
      debugger;
      this.setState(({
        gameStatus: 'async',
        resuming: true
      }), () => this.props.spotify.play({device_id: this.props.selectedDevice}, this.handlePlayResponse))            
    }

    // refactor this to not use async, await, will have to right yet another callback to handle spotify.pause()
    handlePause = async (shouldDrink) => {
      // set gameStatus to async so users can't mash on play/pause button and send off requests
      await this.setState({gameStatus: 'async'});
      await this.props.spotify.pause().catch(() => this.handleErrorState('There was an error pausing, try again')).then(resp => {
        clearInterval(this.state.roundCountdownInterval)
        if (shouldDrink) {
          let playNahNahTimeout = setTimeout(() => this.props.spotify.play({device_id: this.props.selectedDevice, uris: [NAH_NAH_NAH_NAH_URI]}, this.handleNextRoundResponse), 15000);
          this.setState(prevState => ({
              gameStatus: 'drink',
              shuffleCountdown: 'DRINK',
              timeouts: [...prevState.timeouts, playNahNahTimeout]
          }));
        } else {
          debugger;
          this.setState({
            gameStatus: 'paused',
            shuffleCountdown: ''
        });
        }
      });
    } 
  
    render() {
      const { playlist, index} = this.props;
      const { modalOpen, gameStatus} = this.state;
      return (
        <Modal 
          size='tiny'
          open={modalOpen}
          onClose={this.handleClose}
          trigger={<PlaylistCard
                      handleOpen={this.handleOpen}      
                      key={`${playlist.name}-${index}`} 
                      playlist={playlist} />}>
          <BaseGameModal gameStatus={gameStatus} {...this.props} {...this.state} />
        </Modal>
      )
    }
  }

  export default GameModalContainer;
