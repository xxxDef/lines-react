import * as logic from "./logic"


export type PathState = {
    cells: number[]
    color: logic.Color,
    curIndex: number,
}
export type GameState = {

    gameField: logic.Color[];
    selected: number | null,
    path: PathState | null,
    high: number,
    score: number
};

export const initialState: GameState = {
    gameField: Array(logic.Rows * logic.Rows).fill(null),
    selected: null,
    score: 0,
    high: 0,
    path: null,
};
