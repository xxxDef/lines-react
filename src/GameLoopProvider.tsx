import { ReactNode, useContext, useEffect } from "react";
import {GameContext} from "./GameContext";
import { GameState } from "./GameState";
import { GameAction } from "./Actions";

export default function GameLoopProvider({children}: { children: ReactNode }) {
    const {state, dispatch} = useContext(GameContext);

    useEffect(() => {

        if (state.path === null && state.animation === null)
            return;

         const intervalId = setInterval(() => {
            gameLoop(state, dispatch);
        }, 20);

        return () => {           
            clearInterval(intervalId);
        }
    }, [state, dispatch, state.animation, state.path])

    function gameLoop(state: GameState, dispatch: React.Dispatch<GameAction>) {
        
        if (state.path !== null) { // moving
            console.log("state.path !== null");
            if (state.path.curIndex + 1 < state.path.cells.length) {
                dispatch( {type: "tracePath"});
            }
            else {
                dispatch({type: "clearPath"});
                dispatch({type: "nextTurn"});
            }
        }
        if (state.animation !== null) {
            dispatch({type: "animate"});
        }
    }

    return <>{children}</>
}