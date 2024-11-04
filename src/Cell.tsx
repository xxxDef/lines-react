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
        
        const i = state.path.cells.indexOf(index);

        if (i !== -1) {// current cell is in path 
            
            //console.log(`item ${index} of color ${color} is in trace in pos ${i}`);

            // do not show real circle in this place until path is tracing
            // it can be already moved circle or added next circles
            showColor = null; 
            
            if (i <= state.path.curIndex) {
                // current cell is in already traced path (from 0 to curIndex)
                tracePathColor = state.path.color;
            }
        }
    } 
    const selected = state.selected === index;

    return (
        <div className={styles.cell} id={`cell${index}`} onClick={handleClick} onContextMenu={handleRightClick}>
            <Circle index={index}  color={showColor} selected={selected} pathColor={tracePathColor}/>
        </div>
    );
}