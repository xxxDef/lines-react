import { useContext } from 'react';
import styles from "./Cell.module.css";
import { Circle, CircleEffect } from "./Circle";
import {Color} from './logic'

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


        
    function getEffect(): {color: Color, effect: CircleEffect} {
        
        if (state.selected === index)
            return {color, effect: CircleEffect.Selected};

        if (state.animation !== null) {
            if (state.animation.growing !== null) {
                if (state.animation.growing.indexOf(index) !== -1)
                    return {color, effect: CircleEffect.Growing};
            }
            
            if (state.animation.removing !== null) {
                const cur = state.animation.removing.find(v => v.index === index);
                if (cur !== undefined) 
                    return {color: cur.color, effect: CircleEffect.Removing};
            }
        }

        if (state.path !== null) {
            const i = state.path.cells.indexOf(index);
            if (i !== -1) { // current cell is in path 
                if (i <= state.path.curIndex) {
                    return i <= state.path.curIndex
                        ? {color: state.path.color, effect: CircleEffect.Path}
                        : {color: null, effect: CircleEffect.Path};
                    
                }
            }
        }
        return {color: color, effect: CircleEffect.None};
    }

    const effect = getEffect();
   
    return (
        <div className={styles.cell} id={`cell${index}`} onClick={handleClick} onContextMenu={handleRightClick}>
            <Circle color={effect.color} effect={effect.effect}/>
        </div>
    );
}