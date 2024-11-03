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

    let showColor = color;
    let tracePathColor: logic.Color = null;

    if (state.path != null) {
        
        tracePathColor = state.path.cells.slice(0, state.path.curIndex + 1).includes(index)
            ? state.path?.color : null;

        showColor = state.path.cells[state.path.cells.length - 1] === index
            ? null : showColor;

    } 
    const selected = state.selected === index;

    return (
        <div className={styles.cell} id={`cell${index}`} onClick={handleClick} onContextMenu={handleRightClick}>
            <Circle index={index}   color={showColor} selected={selected} pathColor={tracePathColor}/>
        </div>
    );
}