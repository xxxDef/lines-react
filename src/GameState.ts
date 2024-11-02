import * as logic from "./logic"



export type GameState = {

    gameField: logic.Color[];
    selected: number | null,
    path: number[] | null,
    pathColor: logic.Color,
    curPathIndex: number|null,
    high: number,
    score: number
};

export const initialState: GameState = {
    gameField: Array(logic.Rows * logic.Rows).fill(null),
    selected: null,
    score: 0,
    high: 0,
    path: null,
    curPathIndex: null,
    pathColor: null
};
