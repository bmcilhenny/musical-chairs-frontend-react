import React from 'react';
import BeforeGameModal from './game_modals/BeforeGameModal';
import ShuffleGameModal from './game_modals/ShuffleGameModal';
import DanceGameModal from './game_modals/DanceGameModal';
import DrinkGameModal from './game_modals/DrinkGameModal';
import PausedGameModal from './game_modals/PausedGameModal';
import GameOverGameModal from './game_modals/GameOverGameModal';
import ErrorGameModal from './game_modals/ErrorGameModal';
import AsyncGameModal from './game_modals/AsyncGameModal';


const BaseGameModal = ({gameStatus, ...props}) => {
    const components = {
        before: BeforeGameModal,
        shuffle: ShuffleGameModal,
        dance: DanceGameModal,
        drink: DrinkGameModal,
        paused: PausedGameModal,
        gameOver: GameOverGameModal,
        error: ErrorGameModal,
        async: AsyncGameModal

    }

    if (!gameStatus) {
        return null;
    }

    const Component = components[gameStatus];
    return (<Component {...props} />);
}

export default BaseGameModal;