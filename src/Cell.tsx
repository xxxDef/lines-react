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
    
    const game = useContext(GameContext);
    
    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        console.log(`Cell click ${row}-${col}`);
        
        if (color === null)
            game.dispatch( {type: "moveTo", pos: {row, col}});
        else 
            game.dispatch({type: "select", pos: {row, col}});

        e.stopPropagation();
    }
    return (
        <div className={styles.cell} id={`cell${row}-${col}`} onClick={handleClick}>
            <Circle row={row} col={col} color={color}/>
        </div>
    );
}