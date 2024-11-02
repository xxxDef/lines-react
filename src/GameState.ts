import * as logic from "./logic"

export type GameState = {

    gameField: number[];
    selected: number | null,
    high: number,
    score: number
};

export const initialState: GameState = {
    gameField: Array(logic.Rows * logic.Rows).fill(null),
    selected: null,
    score: 0,
    high: 0
};
