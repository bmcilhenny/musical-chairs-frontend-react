import React, {Component, Fragment} from 'react';
import { Label, Transition, Menu, Modal, Button, Icon, Input, Card, Image, Header, Divider, Container, Grid, Placeholder, Segment, Dropdown } from 'semantic-ui-react';
import Spotify from 'spotify-web-api-js';
import * as Util from './util/spotify';
import { times } from 'lodash';

const spotify = new Spotify();
Util.setupSpotify(spotify);

class Loading extends Component {
  render() {
    let cards = times(18, () => {
      return (
        <Card >
        <Card.Content>
          <Placeholder>
            <Placeholder.Image rectangular />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        </Card.Content>
      </Card>
      )
    });
    return (
      <Segment inverted>
          <br/>
          <br/>
          <Placeholder inverted>
            <Placeholder.Line />
            <Placeholder.Image   />
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
          <br />
          <Divider inverted />
          <Card.Group itemsPerRow={6} style={{width: '80%'}}>
            { cards }
          </Card.Group>
      </Segment>
    )
  }
}

class StartGameModal extends Component {
  state = { 
    modalOpen: false,
    loadingGame: false,
    duration: 6000,
    countdown: '',
    modalMessage: 'Set up your game',
    shuffleAnimation: true,
    playing: false,
    counterInterval: '' 
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ 
    modalOpen: false,
    playing: false 
  })
  numPlayerOptions = () => times(15, (i) => ({ key: i, text: `${i + 1} guzzlers`, value: i + 1  }))
  deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))

  handleShuffle = (err, success) => {
    if (err) {
      console.log('ERR', err)
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
        playing: false
      })
      setTimeout(() => {
        spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlay);
      }, this.state.duration)
    }
  }

  handlePlay = (err, success) => {
    if (err) {
      console.log('ERR', err)
      this.setState({ 
        loadingGame: false,
        modalMessage: 'There was an error, try again'
      })
    } else {
      // generate random amount of secs between 5 and 45 seconds
      let roundDuration = Math.floor(Math.random() * ((45-5)+1) + 5) * 1000; 
      setTimeout(() => {
        spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice}).then(resp => {
          const artists = resp.item.artists;
          const artistsNames = artists.reduce((string, artist, i ) => {
            return string += artist.name + (artists.length !== 1 && (artist.length - 1) !== i ? ', ' : '')
          }, '')
          this.setState({
            modalMessage: `Now playing ${resp.item.name} by ${artistsNames}`,
            loadingGame: false,
            playing: true,
            countdown: 'GO!'
          })
        })
      }, 500);
      // need this timeout because of the async between playing and getting current track
      setTimeout(() => {
        
      })
    }
  }

  tick = () => {
    const countdown = this.state.countdown;
    console.log('STATE COUNTDOWN', countdown);
    console.log('STATE COUNTER INTERVAL', this.state.counterInterval);
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


  handleStartGameClick = () => {
    if (this.state.counterInterval) {
      clearInterval(this.state.counterInterval)
    }
    this.setState({
      loadingGame: true,
      playing: false,
      countdown: ''
    })
    setTimeout(() => {
      spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handleShuffle)
    }, 2000); 
  }

  render() {
    const {playlist, index, selected, devices, handlePlaylistSelect, handlePlayersChange, handleDeviceChange, numPlayers, selectedDevice} = this.props;
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
                    devices={devices}  
                    handlePlaylistSelect={handlePlaylistSelect} 
                    handlePlayersChange={handlePlayersChange}
                    handleDeviceChange={handleDeviceChange}
                    numPlayers={numPlayers} 
                    selectedDevice={selectedDevice}
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
            <DropdownWithOptions 
              options={this.numPlayerOptions()} 
              placeholder='How many guzzlers will be guzzling this eve?'
              handleChange={handlePlayersChange}
              value={numPlayers}
            />
            <DropdownWithOptions 
              options={this.deviceOptions()} 
              placeholder='Select which device to stream music from'
              handleChange={handleDeviceChange}
              value={selectedDevice}
            />
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Cancel</Button>
          <Button 
            positive icon='checkmark' 
            labelPosition='right' 
            content='Start Game' 
            disabled={numPlayers && selectedDevice ? false : true}
            onClick={this.handleStartGameClick}
            loading={this.state.loadingGame}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

class PlaylistCard extends Component {
   render() {
      const {playlist, selected, handlePlaylistSelect, handleOpen} = this.props;
      return (
        <Grid.Column>
          <Card onClick={() => {
            handlePlaylistSelect(playlist.id);
            handleOpen();
          }}>
            <Card.Content>
              <Image src={playlist.imageUrl} />
              <br />
              <br />
              <Card.Header textAlign='center'>{playlist.name}</Card.Header>
              <Card.Meta>{playlist.total} songs</Card.Meta>
            </Card.Content>
            {selected ?  
              <Button attached='bottom' color='green'>Selected</Button> : <Button attached='bottom'>Select</Button>}
          </Card>
        </Grid.Column>
      )
   }
}

class PlaylistCounter extends Component {
   render() {
      return (
         <div style={{display: 'inline-block'}}>
           {this.props.playlists.length} total playlists
           <Icon name='bolt' />
         </div>
      )
   }
}

class DropdownWithOptions extends Component {
  render() {
    return (
      <Fragment>
        <Dropdown  
          onChange={this.props.handleChange}
          placeholder={this.props.placeholder} 
          fluid 
          selection 
          options={this.props.options}
          value={this.props.value}
        />
      </Fragment>
    )
  }
}

class Filter extends Component {
   render() {
      return (
         <Fragment>
            <Input 
              icon={<Icon name='search' />} 
              placeholder="Search for a playlist"
              value={this.props.filterString}
              onChange={(text) => this.props.handleChange(text)} />
         </Fragment>
      )
   }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       user: {},
       playlists: [],
       filterString: '',
       selectedPlaylist: '',
       numPlayers: '',
       devices: [],
       selectedDevice: ''
    }
  }

   componentDidMount() {
      setTimeout(() => {
        spotify.getMe().then(resp => {
          this.setState({
            user: resp
          })
        });
        new Promise((resolve, reject) => {
          Util.getPlaylists(spotify.getUserPlaylists, [], resolve, reject)
        })
        .then(resp => {
          this.setState({
            playlists: resp.map(playlist => (
              {
                name: playlist.name, 
                imageUrl: playlist.images.length ? playlist.images[0].url : 'https://profile-images.scdn.co/images/userprofile/default/466b0f566b616665e15b15eac8685e4e29e2291f', 
                total: playlist.tracks.total,
                id: playlist.id,
                uri: playlist.uri
              }
            )),
            user: {
              ...this.state.user, 
              totalPlaylists: resp.total,
              nextPlaylists: resp.next
            }
          })
        });
        spotify.getMyDevices().then(resp => {
          this.setState({
            devices: resp.devices
          })
        })
      }, 2000); 
   }
   componentDidUpdate() {
     if (!this.state.numPlayers && this.state.selectedPlaylist) {
      this.scrollToBottom();
     }
  }
  
  scrollToBottom = () => {
    this.refs.bottom.scrollIntoView({block: 'end', behavior: 'smooth'});
  }


   handlePlaylistSelect = (playlistId) => {
     this.setState({
       selectedPlaylist: playlistId
     })
   }

   handleDeviceChange = (nothing, {value}) => {
     this.setState({
      selectedDevice: value 
     })
   }
   
   handlePlayersChange = (nothing, {value}) => {
    this.setState({
      numPlayers: value
    })
  }

   render() {
      let playlistsToRender = this.state.user && 
      this.state.playlists &&
      this.state.devices ? 
        this.state.playlists.filter(playlist => 
         playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())) : [];
      return (
         <Segment inverted>
            {this.state.user.display_name ? 
              <Fragment>
                <Menu inverted pointing secondary>
                  <Menu.Item 
                    name='home' 
                     />
                  <Menu.Item
                    name='docs'
                  />
                  <Menu.Item
                    name='github'
                  />
                  <Menu.Menu position='right'>
                    <Button color='green'>Log Out</Button>
                  </Menu.Menu>
                </Menu>
                <Header as='h2' icon textAlign='center' >
                  <Image src={this.state.user.images[0].url} size='huge' circular />
                  <br />
                  <br />
                  <Header.Content>{this.state.user.display_name}'s Playlists</Header.Content>
                </Header>
                <Container textAlign='center'>
                  <PlaylistCounter playlists={playlistsToRender} />
                  {/* <HoursCounter playlists={playlistsToRender} /> */}
                </Container>
                <br />
                <Container textAlign='center'>
                  <Filter 
                    handleChange={e => this.setState({filterString: e.target.value})} 
                    filterString={this.state.filterString} 
                  />
                </Container>
                <Divider />
                <Grid stackable columns={6} style={{width: '80%'}} container>
                  {playlistsToRender.map((playlist, i) => 
                    <StartGameModal 
                      playlist={playlist} 
                      key={`${playlist.name}_${i}xx`} 
                      selected={this.state.selectedPlaylist === playlist.id} 
                      handlePlaylistSelect={this.handlePlaylistSelect} 
                      devices={this.state.devices}  
                      handleDeviceChange={this.handleDeviceChange}
                      handlePlayersChange={this.handlePlayersChange}
                      selectedDevice={this.state.selectedDevice}
                      numPlayers={this.state.numPlayers} 
                    />
                  )}
                </Grid>
                <br />
                <Divider />
                <div ref='bottom'></div>
                <br />
                <br />
              </Fragment>
                : <Loading/>
            }
         </Segment>
      )
   }
}