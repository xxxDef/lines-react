import React, { useState } from 'react';
import * as logic from './logic';




function TopPane() {
    return (
        <div id="topPane">
            <NextBalls></NextBalls>
            <RestartButton/>
            <Scores/>                           
        </div>
    );
}

function Scores() {
    return (
        <div >
            High:
            <div className ="score" id="high">--762345</div>
            Score:
            <div className="score" id="score">--2345</div>
        </div>
    )
}

function RestartButton() {
    return (
        <div><button id="restart">Restart</button></div>
    );
}

function NextBalls() {
    return (
        <div id="nextBalls" >
            {logic.forRange(3, (i) => (
                <div className="placeForNext" key={`placeForNext${i}`}>
                    <div key={`nextCircle${i}`} className="circle color2"></div>
                </div>
            ))}
         </div>
    );
}

function Help() {
    return (
        <details className="inline">
            <summary>Help</summary>
            <div>
                move a ball, click on it with the mouse (circle will appear) to select it, then click on a free cell in a field. To deselect a ball just click on another. If movement is possible, ball will go to the specified empty field. After each turn, 3 new balls are placed on a field (random colours & positions). Preview panel shows colours of the next 3 balls. You can always force the next turn without moving anything. Click on preview panel. If the game field is full, game is over.
                Game goal is to arrange balls of the same colour in a straight lines (every direction). 5 or more balls on a straight line are removed and points are given. Longer lines give more points to you. Crossing lines count together.
            </div>
        </details>
    );
}

function BottomPane() {
    return (
        <div id="bottomPane">
            <Help/>                        
        </div> 
    );
}

function GameField() {
    return (
        <div id="gameField">
            {logic.forRange(logic.Rows, (row) => (
                <Row row={row} key={row}/>         
            ))}
        </div>
    );
}

function Row({row } : {row: number}) {
    return (
        <div id={"row"+row}>
            {logic.forRange(logic.Rows, (col) => (
                <Cell row={row} col={col} key={col}/> 
            ))}           
        </div>
    )
}

function Cell({row, col}: {row:number, col: number}) {
    return (
        <div className='cell' id={`cell${row}-${col}`}>
            <div id={`circle${row}-${col}`}></div>
        </div>
    );
}

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