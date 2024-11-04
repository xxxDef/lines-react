import * as logic from "./logic"


export type PathState = {
    cells: number[]
    color: logic.Color,
    curIndex: number,
}

export type Animation = {
    removing: logic.RemovingItem[] | null,
    growing: number[] | null,
    animation: number,
}



export type GameState = {

    gameField: readonly logic.Color[],
    selected: number | null,
    path: PathState | null,
    high: number,
    score: number,
    nextCircles: logic.Color[],
    animation: Animation | null,
    isGameEnd: boolean
};

export const initialState: GameState = {
    gameField: Array(logic.Rows * logic.Rows).fill(null),
    nextCircles: logic.getNextCircles(),
    selected: null,
    score: 0,
    high: 0,
    path: null,
    animation: null,
    isGameEnd: false
};
