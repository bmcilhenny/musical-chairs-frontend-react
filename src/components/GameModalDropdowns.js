import React, {Fragment} from 'react';
import {Label} from 'semantic-ui-react';
import DropdownWithOptions from './DropdownWithOptions';

const GameModalDropdowns = ({gameStatus, roundsLeft, numPlayers, selectedDevice, handlePlayersChange, handleDeviceChange, numPlayerOptions, deviceOptions}) => {
    switch (gameStatus) {
        case 'play':
            return (
                <Fragment>
                    <Label circular color='green'>{roundsLeft}</Label>
                    <span>rounds remaining</span>
                </Fragment>
            )
        case 'paused':
            return (
                <Fragment>
                    <Label circular color='green'>{roundsLeft}</Label>
                    <span>rounds remaining</span>
                </Fragment>
            )
        case 'drink':
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
        case 'shuffle':
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
        default:
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