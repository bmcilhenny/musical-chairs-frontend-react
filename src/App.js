import React, {Component, Fragment} from 'react';
import { Icon, Input, Card, Image, Feed, Header, Divider, Container, Grid, Placeholder } from 'semantic-ui-react';
import Spotify from 'spotify-web-api-js';
import Util from './util/spotify';

const spotify = new Spotify();
Util.setupSpotify(spotify);


// const fakeServerData = {
//    user: {
//       name: 'Brendan',
//       profile_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Circle-icons-brush-pencil.svg/2000px-Circle-icons-brush-pencil.svg.png',
//       playlists: [
//          {
//             name: "Brendan's aweosome playlist",
//             songs: [
//                {name: "Beat it", duration: 1345}, 
//                {name: "Numb", duration: 3456},
//                {name: "Pass the peas", duration: 2344}
//             ]
//          },
//          {
//             name: "Bathroom splosions",
//             songs: [
//                {name: "Stanky leg", duration: 1345}, 
//                {name: "Sweat and fear", duration: 3456},
//                {name: "Pass the peas", duration: 2344}
//             ]
//          },
//          {
//             name: "Menash's weird playlist",
//             songs: [
//                {name: "Beat it", duration: 1345}, 
//                {name: "Numb", duration: 3456},
//                {name: "Pass the peas", duration: 2344}
//             ]
//          },
//          {
//             name: "Movie score tunes",
//             songs: [
//                {name: "Beat it", duration: 1345}, 
//                {name: "Numb", duration: 3456},
//                {name: "Pass the peas", duration: 2344}
//             ]
//          }
//       ]
//    }
// }


class Loading extends Component {
  render() {
    return (
      <Fragment>
          <br/>
          <br/>
          <br/>
          <Placeholder>
            <Placeholder.Image  circular />
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
          <br />
          <Divider />
          <Card.Group itemsPerRow={4}>
            <Card>
              <Card.Content>
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Placeholder>
                  <Placeholder.Image rectangular />
                </Placeholder>
              </Card.Content>
            </Card>
          </Card.Group>
      </Fragment>
    )
  }
}

class Playlist extends Component {
   render() {
      let playlist = this.props.playlist;
      debugger;
      return (
        <Grid.Column>
          <Card>
            <Card.Content>
              <Image src={playlist.imageUrl} />
              <Card.Header textAlign='center'>{playlist.name}</Card.Header>
              <Card.Meta>{playlist.songs.length} songs</Card.Meta>
              <Feed>
              {playlist.songs.map(song => {
                let songLength = `${(song.duration/60).toFixed(2)}`
                return (
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content={songLength} />
                      <Feed.Summary>
                        {song.name}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                )
              })}
              </Feed>
            </Card.Content>
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
   state = { 
      numPlayers: 3,
      playlist: "Pick a playlist bro",
      user: {},
      playlists: [],
      filterString: ''
   }

   componentDidMount() {
      setTimeout(() => {
        spotify.getMe().then(resp => {
          debugger;
          this.setState({
            user: resp
          })
        });
        spotify.getUserPlaylists().then(resp => {
          this.setState({
            playlists: resp.items.map(playlist => (
              {
                name: playlist.name, 
                imageUrl: playlist.images.length ? playlist.images[0].url : 'https://profile-images.scdn.co/images/userprofile/default/466b0f566b616665e15b15eac8685e4e29e2291f', 
                songs: []
              }
            ))
          })
        })
      }, 2000); 
   }

   render() {
      let playlistsToRender = this.state.user && 
      this.state.playlists ? 
        this.state.playlists.filter(playlist => 
         playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())) : [];
      
      return (
         <div className="App" >
            {this.state.user.display_name ? 
              <Fragment>
                <br /> 
                <Header as='h2' icon textAlign='center'>
                  <Image src={this.state.user.images[0].url} size='huge' circular />
                  <Header.Content>{this.state.user.display_name}'s Playlists</Header.Content>
                </Header>
                <Container textAlign='center'>
                  <PlaylistCounter playlists={playlistsToRender} />
                  <HoursCounter playlists={playlistsToRender} />
                </Container>
                <Container textAlign='center'>
                  <Filter handleChange={e => this.setState({filterString: e.target.value})} filterString={this.state.filterString} />
                </Container>
              <Divider />
              <Grid stackable columns={4}>
                {playlistsToRender.map((playlist, i) => <Playlist playlist={playlist} key={`${playlist.name}_${i}xx`} />
                )}
              </Grid>
              </Fragment>
                : <Loading/>
            }
         </div>
      )
   }
}