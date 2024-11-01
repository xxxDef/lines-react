import React, { useState } from 'react';
import TopPane from "./TopPane"
import GameField from './GameField';
import BottomPane from './BottomPane';

function GameContainer() {
    return (
        <div id="gameContainer">
            <TopPane/>            
            <GameField/>
            <BottomPane/>           
        </div>
    );
}

export default GameContainer;