import React, {Fragment} from 'react';
import {Label} from 'semantic-ui-react';
import DropdownWithOptions from './DropdownWithOptions';

const GameModalDropdowns = ({gameStatus, roundsLeft, numPlayers, selectedDevice, handlePlayersChange, handleDeviceChange, numPlayerOptions, deviceOptions}) => {
    let lastRound = <Label size='large' color='red'>The Last Round</Label>
    let roundsRemaining = (
        <Fragment>
            <Label circular color='green'>{roundsLeft}</Label>
            <span>rounds remaining</span>
        </Fragment>
    )
    if (gameStatus === 'play' || gameStatus === 'paused' || gameStatus === 'drink' ||  gameStatus === 'async') {
        if (roundsLeft === 1) {
            return lastRound;
        } else {
            return roundsRemaining
        }
    } else if (gameStatus ===  'shuffle') {
        return (
            <Fragment>
                <DropdownWithOptions
                    disabled={true} 
                    options={numPlayerOptions} 
                    placeholder='How many guzzlers will be guzzling this eve?'
                    value={numPlayers}
                />
                <DropdownWithOptions
                    disabled={true} 
                    options={deviceOptions} 
                    placeholder='Select which device to stream music from..'
                    value={selectedDevice}
                />
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <DropdownWithOptions
                    disabled={false} 
                    options={numPlayerOptions} 
                    placeholder='How many guzzlers will be guzzling this eve?'
                    handleChange={handlePlayersChange}
                    value={numPlayers}
                />
                <DropdownWithOptions 
                    disabled={false}
                    options={deviceOptions} 
                    placeholder='Select which device to stream music from..'
                    handleChange={handleDeviceChange}
                    value={selectedDevice}
                />
            </Fragment>
        )
    }
}

export default GameModalDropdowns;