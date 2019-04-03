import React, {Component, Fragment} from 'react';
import { Menu, Modal, Button, Icon, Input, Card, Image, Header, Divider, Container, Grid, Placeholder, Segment, Dropdown } from 'semantic-ui-react';
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
            <Placeholder.Image  circular />
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
  numPlayerOptions = () => times(15, (i) => ({ key: i, text: `${i + 1} guzzlers`, value: i + 1  }))
  deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))

  render() {
    const {playlist, modalTrigger, handlePlayersChange, handleDeviceChange, numPlayers, selectedDevice} = this.props;
    console.log("Is it disabled?", numPlayers && selectedDevice ? false : true);
    console.log("# players", numPlayers );
    console.log("selected device", selectedDevice );
    return (
      <Modal trigger={modalTrigger} size='mini'>
        <Modal.Header h2>Set up your game</Modal.Header>
        <Modal.Content>
          <Container textAlign='center'>
            <Image src={playlist.imageUrl} />
            <h4>You've selected '{playlist.name}'</h4>
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
          <Button negative>Cancel</Button>
          <Button 
            positive icon='checkmark' 
            labelPosition='right' 
            content='Start Game' 
            disabled={numPlayers && selectedDevice ? false : true}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

class Playlist extends Component {
   render() {
      const {playlist, devices, handleDeviceChange, handlePlayersChange, selectedDevice, numPlayers, selected, handlePlaylistSelect} = this.props;
      const modalTrigger =
        (<Grid.Column>
          <Card onClick={() => handlePlaylistSelect(playlist.id)}>
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
        </Grid.Column>);
        return <StartGameModal 
                  modalTrigger={modalTrigger} 
                  playlist={playlist} 
                  devices={devices}
                  selectedDevice={selectedDevice}
                  numPlayers={numPlayers}
                  handleDeviceChange={handleDeviceChange}
                  handlePlayersChange={handlePlayersChange}
                />
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

class HoursCounter extends Component {
   render() {
      let allSongs = this.props.playlists.reduce((songs, playlist)=> {
         return songs.concat(playlist.songs)
      }, [])
      let totalDuration = Math.round(allSongs.reduce((sum, song) => sum + song.duration, 0)/3600)
      return (
        <div style={{display: 'inline-block'}}>
          {totalDuration} hours
          <Icon name='time' />
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
            <img />
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
                id: playlist.id
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
          debugger;
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
                <br /> 
                <Header as='h2' icon textAlign='center' >
                  <Image src={this.state.user.images[0].url} size='huge' circular />
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
                    <Playlist 
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