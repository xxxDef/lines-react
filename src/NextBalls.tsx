import { useContext } from 'react';
import { Circle, CircleEffect } from './Circle';
import {forRange} from './logic'
import {GameContext} from './GameContext';

export default function NextBalls() {
    
    const {state} = useContext(GameContext);
    
    return (
        
        <div id="nextBalls" >
            {forRange(3, (i) => (
                <div className="placeForNext" key={`placeForNext${i}`}>
                    <Circle color={state.nextCircles[i]} effect={CircleEffect.None}/>
                </div>
            ))}
         </div>
    );
}