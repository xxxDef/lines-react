import { createContext, useReducer, Dispatch, useEffect } from "react";
import { ReactNode } from "react";
import { GameAction } from "./Actions";
import { GameState, initialState } from "./GameState";
import { gameReducer } from "./Reducers";
import GameLoopProvider from "./GameLoopProvider";

type Game = {
    state: GameState,
    dispatch: Dispatch<GameAction>
}

export const GameContext = createContext<Game>({ state: initialState, dispatch: () => undefined });

export default function GameProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        //console.log("***")
        dispatch({type:"nextTurn"});
    }, []);


    return (
        <GameContext.Provider value={{ state, dispatch }}>
            <GameLoopProvider>
                {children}
            </GameLoopProvider>
        </GameContext.Provider>
    );
}

