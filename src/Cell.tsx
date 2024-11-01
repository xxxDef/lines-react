import { useContext } from 'react';
import styles from "./Cell.module.css";
import { Circle } from "./Circle";
import * as logic from './logic'

import { GameContext } from "./GameContext";

type CellProps = {
    row:number, 
    col: number, 
    color: logic.Color
};

export default function Cell({row, col, color}: CellProps) {
    
    const {state, dispatch} = useContext(GameContext);
    
    function handleClick(e: React.MouseEvent<HTMLDivElement>) {

        if (color === null)
            dispatch( {type: "moveTo", pos: {row, col}});
        else 
            dispatch({type: "select", pos: {row, col}});

        e.stopPropagation();
    }

    const selected = state.selected?.row === row && state.selected?.col === col;
    return (
        <div className={styles.cell} id={`cell${row}-${col}`} onClick={handleClick}>
            <Circle row={row} col={col} color={color} selected={selected}/>
        </div>
    );
}