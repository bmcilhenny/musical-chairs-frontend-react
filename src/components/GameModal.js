import React, { Component } from 'react';
import { Label, Transition, Modal, Image, Header, Container } from 'semantic-ui-react';
import { times } from 'lodash';
import PlaylistCard from './PlaylistCard';
import * as Helper from '../helpers';
import GameModalActions from './GameModalActions';
import GameModalDropdowns from './GameModalDropdowns';
import {NAH_NAH_NAH_NAH_URI} from '../constants';

class GameModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            loadingGame: false,
            duration: 6000,
            shuffleCountdown: '',
            shuffleCountdownInterval: '',
            roundCountdown: '',
            roundCountdownInterval: '',
            modalMessage: 'Set up your game',
            shuffleAnimation: true,
            playing: false,
            gameStatus: null,
            roundsLeft: props.numPlayers,
            error: '',
            resuming: false
        }
    }

    defaultState = () => ({
        modalOpen: false,
        loadingGame: false,
        duration: 6000,
        shuffleCountdown: '',
        shuffleCountdownInterval: '',
        roundCountdown: '',
        roundCountdownInterval: '',
        modalMessage: 'Set up your game',
        shuffleAnimation: true,
        playing: false,
        gameStatus: null,
        roundsLeft: this.props.numPlayers,
        error: '',
        resuming: false
    })
    
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        clearInterval(this.state.shuffleCountdownInterval);
        clearInterval(this.state.roundCountdownInterval);
        this.setState(this.defaultState())
    }

    setShuffleState = () => {
      this.setState({
        shuffleAnimation: !this.state.shuffleAnimation,
        modalMessage:  'Shuffling...',
        playing: false,
        gameStatus: 'shuffle'
      })
    }

    setCountdown = (countdownType, initialVal) => {
      let countdownInterval = setInterval(() => this.tick(countdownType, initialVal), 1000);
      this.setState({
        [countdownType]: initialVal,
        [`${countdownType}Interval`]: countdownInterval
      })
    }

    tick = (countdownType, initialVal) => {
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

    setPlayState = (currentTrack, artistsNames) => {
      this.setState({
        modalMessage: `Now playing "${currentTrack.item.name}" by ${artistsNames}`,
        loadingGame: false,
        playing: true,
        shuffleCountdown: 'GO!',
        gameStatus: 'play'
      })
    }

    handleGetCurrentPlaybackResponse = (err, currentTrack) => {
      if (err) {
        alert (err)
        this.setState({ 
          loadingGame: false,
          modalMessage: 'There was an error getting your playback, try again',
          playing: false 
        })
      } else {
        if (this.state.resuming) {
          this.setState({
            resuming: false
          })
          const artists = currentTrack.item.artists;
          const artistsNames = artists.reduce((string, artist, i ) => {
            return string += artist.name + ((artists.length !== 1) && ((artist.length - 1) !== i) ? ', ' : '')
          }, '');
          this.setPlayState(currentTrack, artistsNames);
          this.setCountdown('roundCountdown', this.state.roundCountdown)
        } else {
          const artists = currentTrack.item.artists;
          const artistsNames = artists.reduce((string, artist, i ) => {
            return string += artist.name + ((artists.length !== 1) && ((artist.length - 1) !== i) ? ', ' : '')
          }, '');
          this.setPlayState(currentTrack, artistsNames);
          this.setCountdown('roundCountdown', Helper.genRandomNumber(20, 10))
        }
      }
    }

    handlePlayResponse = async () => {
        await Helper.sleep(600);
        this.props.spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice}, this.handleGetCurrentPlaybackResponse);
    }

    numPlayerOptions = () => times(14, (i) => ({ key: i + 2, text: `${i + 2} guzzlers`, value: i + 2  }))
    deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))

    playNahNahNahNahNahNahNahNahHeyHeyHeyGoodbye = () => {
      this.props.spotify.play({device_id: this.props.selectedDevice, uris: [NAH_NAH_NAH_NAH_URI]})
      .then(resp => {
      })
      .catch(err => {
        debugger;
        alert(err)
      })
    }

    handleShuffleResponse = (err, resp) => {
      if (err) {
        alert (err)
        this.setState({ 
          loadingGame: false,
          modalMessage: 'There was an error shuffling, try again',
          playing: false 
        })
      } else {
        if (this.state.resuming) {
          this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlayResponse)
        } else {
          this.setCountdown('shuffleCountdown', 5);
          setTimeout(() => this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlayResponse), 6000);
        }
      }
    }

    handlePauseResponse = (err, resp) => {
      if (err) {
      } else {
      }
    }

    startGame = () => {
      let roundsLeft = this.props.numPlayers - 1;
      if (this.state.shuffleCountdownInterval) {
        clearInterval(this.state.shuffleCountdownInterval)
      }
      this.setState({
        roundsLeft: roundsLeft
      })
      this.setShuffleState();
      this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handleShuffleResponse);
      // Helper.sleep(15000)
      // this.playNahNahNahNahNahNahNahNahHeyHeyHeyGoodbye()
      // Helper.sleep(11000)
      // this.setState({
      //   roundsLeft: this.props.numPlayers - 1
      // })
      // this.setState({
      //   gameStatus: 'gameOver',
      //   modalMessage: 'Game Over',
      //   shuffleCountdown: null
      // })
    }
  
    handleShuffle = (err, resp) => {
      if (err) {
        alert (err)
        this.setState({ 
          loadingGame: false,
          modalMessage: 'There was an error, try again',
          playing: false 
        })
      } else {
        this.startShuffleCountdown();
        this.setState({
          shuffleAnimation: !this.state.shuffleAnimation,
          modalMessage:  'Shuffling...',
          playing: false,
          gameStatus: 'shuffle'
        })
        setTimeout(() => {
          this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlayResponse);
        }, this.state.duration)
      }
    }
  
    // handlePlay = (err, success) => {
    //   if (err) {
    //     this.setState({ 
    //       loadingGame: false,
    //       gameStatus: 'play',
    //       modalMessage: 'There was an error, try again'
    //     })
    //   } else {
    //     // generate random amount of secs between 5 and 45 seconds 
    //     setTimeout(() => {
    //       this.props.spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice})
    //       // .then(resp => {
    //       //   const artists = resp.item.artists;
    //       //   const artistsNames = artists.reduce((string, artist, i ) => {
    //       //     return string += artist.name + ((artists.length !== 1) && ((artist.length - 1) !== i) ? ', ' : '')
    //       //   }, '')
    //       //   this.setState({
    //       //     modalMessage: `Now playing "${resp.item.name}" by ${artistsNames}`,
    //       //     loadingGame: false,
    //       //     playing: true,
    //       //     countdown: 'GO!',
    //       //     gameStatus: 'play'
    //       //   })
    //       // }).catch(this.handleShuffleError)
    //     }, 500);
    //     // need this timeout because of the async between playing and getting current track
    //     setTimeout(() => {
          
    //     })
    //   }
    // }
  
    // runRound = () => {
    //   // let roundDuration = Helper.genRandomNumber(this.state.max, this.state.min)
    //   setTimeout(() => {
    //     this.props.spotify.getMyCurrentPlaybackState().then(resp => {
    //         if (resp.is_playing) {
    //             this.handlePause(true);
    //         }
    //     });
    //     this.setState({
    //         roundsLeft: this.state.roundsLeft - 1
    //     })
    //   }, roundDuration)
    // }
  
    handleSkip = () => {
        // check to see if song that was playing is different than song that is playing
      console.log('SKIP SONG')
    }

    handleResume = () => {
      this.setState({
        resuming: true
      })
      this.props.spotify.play({device_id: this.props.selectedDevice}, this.handlePlayResponse)
      // this.props.spotify.setShuffle(false, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handleShuffleResponse)
    }

    // refactor this to not use async, await, will have to right yet another callback to handle spotify.pause()
    handlePause = async (shouldDrink) => {
      await this.props.spotify.pause().catch((err) => {
          console.log('ERROR PAUSING', err)
      });
      if (shouldDrink) {
        this.setState({
            gameStatus: 'drink',
            shuffleCountdown: 'DRINK'
        });
      } else {
        clearInterval(this.state.roundCountdownInterval)
        this.setState({
          gameStatus: 'paused',
          shuffleCountdown: 'PAUSE'
      });
      }
      let resp = await this.props.spotify.getMyCurrentPlaybackState();
      if (resp.is_playing) {
          await this.handlePause(shouldDrink);
      } 
    }  
  
    render() {
      console.log('Round Countdown', this.state.roundCountdown)
      const {playlist, index, selected, handlePlaylistSelect, handlePlayersChange, handleDeviceChange, numPlayers, selectedDevice} = this.props;
      const { modalOpen, modalMessage, gameStatus, loadingGame, roundsLeft, shuffleCountdown, duration, shuffleAnimation, playing} = this.state;
      return (
        <Modal 
          size='mini'
          open={modalOpen}
          onClose={this.handleClose}
          trigger={<PlaylistCard
                      handleOpen={this.handleOpen}      
                      key={`${playlist.name}_${index}xx`} 
                      playlist={playlist} 
                      selected={selected} 
                      handlePlaylistSelect={handlePlaylistSelect} 
                    />} 
        >
          <Modal.Header h2>{modalMessage}</Modal.Header>
          {shuffleCountdown ? <Label circular color='green' size='massive' floating>{shuffleCountdown}</Label> : null}
          <Modal.Content>
            <Container textAlign='center'>
              <Transition animation='shake' duration={duration} visible={shuffleAnimation}>
                <Image 
                  centered 
                  size='small' 
                  src={playlist.imageUrl} 
                  label={playing ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
                />
              </Transition>
              <Header as='h3'>
                <Header.Content>
                  {playlist.name}
                  <Header.Subheader>Your selected Playlist</Header.Subheader>
                </Header.Content>
              </Header>
              <GameModalDropdowns
                gameStatus={gameStatus}
                numPlayers={numPlayers}
                roundsLeft={roundsLeft}
                numPlayerOptions={this.numPlayerOptions()} 
                deviceOptions={this.deviceOptions()}
                handlePlayersChange={handlePlayersChange}
                selectedDevice={selectedDevice}
                handleDeviceChange={handleDeviceChange}
              />
            </Container>
          </Modal.Content>
          <GameModalActions
            gameStatus={gameStatus} 
            numPlayers={numPlayers}
            selectedDevice={selectedDevice}
            handleClose={this.handleClose}
            loadingGame={loadingGame}
            handleClose={this.handleClose}
            handleSkip={this.handleSkip}
            handlePause={this.handlePause}
            startGame={this.startGame}
            handleResume={this.handleResume}
          />
        </Modal>
      )
    }
  }

  export default GameModal;