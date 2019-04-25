import React, {Component} from 'react';
import { Image, Grid, Icon, Reveal, Header} from 'semantic-ui-react';

class PlaylistCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
    }

    toggleSize = (e) => {
        this.setState(prevState => {
            return ({hovering: !prevState.hovering})
        })
    }
    
    render() {
        const {playlist, handleOpen} = this.props;
        console.log(this.state.hovering)
        return (
            <Grid.Column>
                    <Reveal animated='fade' instant onClick={handleOpen}>
                        <Reveal.Content visible >
                            <div  onMouseEnter={this.toggleSize} onMouseLeave={this.toggleSize} style={{zIndex: '-1', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid rgba(0, 0, 0, 0)', height: this.state.hovering ? '75px' : '60px', width: this.state.hovering ? '75px' : '60px', backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '50%'}}></div>
                            <Image style={{zIndex: '-2'}} src={playlist.imageUrl} size='medium'/>
                        </Reveal.Content>
                        <Reveal.Content hidden>
                        <Icon  name='beer' size='large' style={{zIndex: '-1', fontSize: this.state.hovering ? '2.0em' : '1.5em', position: 'absolute', top: '50%', left: '51%', transform: 'translate(-50%, -50%)'}} />
                            <div  style={{zIndex: '-2', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid white', height: this.state.hovering ? '75px' : '60px', width: this.state.hovering ? '75px' : '60px', backgroundColor: 'rgba(0, 0, 0, 0.5)', filter: 'brightness(50%)', borderRadius: '50%'}}></div>
                            <Image  src={playlist.imageUrl} style={{filter: 'brightness(50%)', zIndex: '-3'}} size='medium'/>
                        </Reveal.Content>
                    </Reveal>
                        <Header as='h5' style={{color: 'white', marginBlockStart: '0.5em'}}>
                            {playlist.name}
                            <Header.Subheader style={{color: '#969696'}}>{playlist.total} song{playlist.total > 1 ? 's' : null}</Header.Subheader>
                        </Header>
            </Grid.Column>
        )

    }
 }

 export default PlaylistCard;