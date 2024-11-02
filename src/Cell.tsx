import React, { useContext } from 'react';
import styles from "./Cell.module.css";
import { Circle } from "./Circle";
import * as logic from './logic'

import { GameContext } from "./GameContext";

type CellProps = {
    index:number, 
};

export default function Cell({index}: CellProps) {
    
    const {state, dispatch} = useContext(GameContext);

    const color = state.gameField[index];
    
    function handleClick(e: React.MouseEvent<HTMLDivElement>) {

        if (color === null)
            dispatch( {type: "moveTo", index: index});
        else 
            dispatch({type: "select", index: index});

        e.stopPropagation();
    }

    function handleRightClick(e: React.MouseEvent<HTMLDivElement>) {
        
        dispatch( {type: "addCircle", index: index});
        e.preventDefault();
        e.stopPropagation();
    }

    const selected = state.selected === index;
    return (
        <div className={styles.cell} id={`cell${index}`} onClick={handleClick} onContextMenu={handleRightClick}>
            <Circle index={index}   color={color} selected={selected}/>
        </div>
    );
}