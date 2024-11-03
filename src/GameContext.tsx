import { createContext, useReducer, Dispatch } from "react";
import { ReactNode } from "react";
import { GameAction } from "./Actions";
import { GameState, initialState } from "./GameState";
import { gameReducer } from "./Reducers";
import PathProvider from "./PathProvider";


type Game = {
    state: GameState,
    dispatch: Dispatch<GameAction>
}

export const GameContext = createContext<Game>({ state: initialState, dispatch: () => undefined });

export default function GameProvider({ children }: { children: ReactNode }) {

    const [game, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state: game, dispatch: dispatch }}>
            <PathProvider>
                {children}
            </PathProvider>
        </GameContext.Provider>
    );
}

