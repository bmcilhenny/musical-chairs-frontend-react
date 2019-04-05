import React, {Component, Fragment} from 'react';
import { Image, Header, Divider, Container, Grid, Segment } from 'semantic-ui-react';
import Spotify from 'spotify-web-api-js';
import * as Util from './util/spotify';
import Loading from './components/Loading';
import PlaylistCounter from './components/PlaylistCounter';
import PlaylistFilter from './components/PlaylistFilter';
import StartGameModal from './components/StartGameModal';
import Navbar from './components/Navbar';

const spotify = new Spotify();
Util.setupSpotify(spotify);

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
        }).catch((err) => {
          Util.getNewToken();
        });
        new Promise((resolve, reject) => {
          Util.getPlaylists(spotify.getUserPlaylists, [], resolve, reject)
        })
        .then(resp => {
          debugger;
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
              totalPlaylists: resp.total
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
                <Navbar />
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
                  <PlaylistFilter 
                    handleChange={e => this.setState({filterString: e.target.value})} 
                    filterString={this.state.filterString} 
                  />
                </Container>
                <Divider />
                <Grid stackable columns={6} style={{width: '80%'}} container>
                  {playlistsToRender.map((playlist, i) => 
                    <StartGameModal 
                      spotify={spotify}
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