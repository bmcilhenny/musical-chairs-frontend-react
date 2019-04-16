import React, { Component, Fragment } from 'react';
import { Label, Transition, Modal, Button, Icon, Image, Header, Container } from 'semantic-ui-react';
import { times } from 'lodash';
import PlaylistCard from './PlaylistCard';
import * as Helper from '../helpers';
import GameModalActions from './GameModalActions';
import GameModalDropdowns from './GameModalDropdowns';

class GameModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            loadingGame: false,
            duration: 6000,
            countdown: '',
            modalMessage: 'Set up your game',
            shuffleAnimation: true,
            playing: false,
            gameStatus: null,
            counterInterval: '',
            roundsLeft: props.numPlayers,
            error: '',
            max: 50,
            min: 15,
            randNum: 0,
            counter: 0
        }
    }

    defaultState = () => ({
        modalOpen: false,
        loadingGame: false,
        duration: 6000,
        countdown: '',
        modalMessage: 'Set up your game',
        shuffleAnimation: true,
        playing: false,
        gameStatus: null,
        counterInterval: '',
        roundsLeft: this.props.numPlayers,
        error: '',
        max: 50,
        min: 15,
        randNum: 0,
        counter: 0
    })
    
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        clearInterval(this.state.counterInterval);
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

    setPlayState = (currentTrack, artistsNames) => {
      this.setState({
        modalMessage: `Now playing "${currentTrack.item.name}" by ${artistsNames}`,
        loadingGame: false,
        playing: true,
        countdown: 'GO!',
        gameStatus: 'play'
      })
    }

    handlePlay = async (succes) => {
      try {
        await this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri})
        let currentTrack = await this.props.spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice})
        const artists = currentTrack.item.artists;
        const artistsNames = artists.reduce((string, artist, i ) => {
          return string += artist.name + ((artists.length !== 1) && ((artist.length - 1) !== i) ? ', ' : '')
        }, '');
        this.setPlayState(currentTrack, artistsNames);
      } catch (err) {
        debugger;
      }
    }

    numPlayerOptions = () => times(15, (i) => ({ key: i, text: `${i + 1} guzzlers`, value: i + 1  }))
    deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))

    playNahNahNahNahNahNahNahNahHeyHeyHeyGoodbye = () => {
      this.props.spotify.play({device_id: this.props.selectedDevice, uris: ['spotify:track:1Yp50bPPjK0VIAI2mKK5TG']})
      .then(resp => {
        debugger;
      })
      .catch(err => {
        debugger;
      })
    }

    handleStartGameClick = async () => {
      let roundsLeft = this.props.numPlayers - 1;
      if (this.state.counterInterval) {
        clearInterval(this.state.counterInterval)
      }
      try {
          await this.setShuffleState()
          await this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri})
          this.startCountDown();
          await this.handlePlay()
          // await Helper.sleep(1500)
          await Helper.sleep(Helper.genRandomNumber(this.state.max, this.state.min))
          await this.handlePause(true)
          await Helper.sleep(15000)
          this.playNahNahNahNahNahNahNahNahHeyHeyHeyGoodbye()
          await Helper.sleep(11000)
          this.setState({
            roundsLeft: this.state.roundsLeft ? this.state.roundsLeft - 1 : this.props.numPlayers - 1
          })
          roundsLeft--;
      } catch (e) {
          debugger;
          alert(e)
      }
      this.setState({
        gameStatus: 'gameOver'
      })
    }

    handleGamePlaying = () => {
      const randNum = Helper.genRandomNumber(this.state.max, this.state.min)
      this.setState({
        randNum: randNum
      })
    }
  
    handleShuffle = (err, success) => {
      if (err) {
        console.log('Shuffle error', err)
        this.setState({ 
          loadingGame: false,
          modalMessage: 'There was an error, try again',
          playing: false 
        })
      } else {
        this.startCountDown();
        this.setState({
          shuffleAnimation: !this.state.shuffleAnimation,
          modalMessage:  'Shuffling...',
          playing: false,
          gameStatus: 'shuffle'
        })
        setTimeout(() => {
          this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlay);
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
    //       // }).catch(handleShuffleError)
    //     }, 500);
    //     // need this timeout because of the async between playing and getting current track
    //     setTimeout(() => {
          
    //     })
    //   }
    // }
  
    tick = () => {
      const countdown = this.state.countdown;
    //   console.log('STATE COUNTDOWN', countdown);
      if (countdown === 0) {
        clearInterval(this.state.counterInterval)
      } else {
        this.setState({
          countdown: (countdown - 1)
        })
      }
    }
  
    startCountDown = () => {
      let counterInterval = setInterval(this.tick, 1000);
      this.setState({
        countdown: 5,
        counterInterval: counterInterval
      })
    }
  
    runRound = () => {
      let roundDuration = Helper.genRandomNumber(this.state.max, this.state.min)
      setTimeout(() => {
        this.props.spotify.getMyCurrentPlaybackState().then(resp => {
            if (resp.is_playing) {
                this.handlePause(true);
            }
        });
        this.setState({
            roundsLeft: this.state.roundsLeft - 1
        })
      }, roundDuration)
    }
  
    handleSkip = () => {
        // check to see if song that was playing is different than song that is playing
      console.log('SKIP SONG')
    }

    handlePause = async (shouldDrink) => {
        console.log('SHOULD WE DRINK?', shouldDrink);
        await this.props.spotify.pause().catch((err) => {
            console.log('ERROR PAUSING', err)
        });
        this.setState({
            gameStatus: 'paused',
            countdown: shouldDrink ? 'DRINK' : 'PAUSED'
        });
        let resp = await this.props.spotify.getMyCurrentPlaybackState();
        if (resp.is_playing) {
            await this.handlePause(shouldDrink);
        } 
        // ).catch(err => console.log('ERROR GETTING CURRENT PLAYBACK STATE IN HANDLE PAUSE', err));
    }  
  
    render() {
      console.log('NUM PLAYERS', this.props.numPlayers);
      console.log('ROUNDS', this.state.roundsLeft);
      const {playlist, index, selected, handlePlaylistSelect, handlePlayersChange, handleDeviceChange, numPlayers, selectedDevice} = this.props;
      const { gameStatus, loadingGame, roundsLeft} = this.state;
      return (
        <Modal 
          size='mini'
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={<PlaylistCard
                      handleOpen={this.handleOpen}      
                      key={`${playlist.name}_${index}xx`} 
                      playlist={playlist} 
                      selected={selected} 
                      handlePlaylistSelect={handlePlaylistSelect} 
                    />} 
        >
          <Modal.Header h2>{this.state.modalMessage}</Modal.Header>
          {this.state.countdown ? <Label circular color='green' size='massive' floating>{this.state.countdown}</Label> : null}
          <Modal.Content>
            <Container textAlign='center'>
              <Transition animation='shake' duration={this.state.duration} visible={this.state.shuffleAnimation}>
                <Image 
                  centered 
                  size='small' 
                  src={playlist.imageUrl} 
                  label={this.state.playing ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
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
            handleStartGameClick={this.handleStartGameClick}
          />
        </Modal>
      )
    }
  }

  export default GameModal;