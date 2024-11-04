import {Color, getNextCircles, RemovingItem, Rows} from "./logic"

export type Path = {
    cells: number[]
    color: Color,
    curIndex: number,
}

export type Animation = {
    removing: RemovingItem[] | null,
    growing: number[] | null,
    remaining: number,
}

export type GameState = {

    gameField: readonly Color[],
    selected: number | null,
    path: Path | null,
    high: number,
    score: number,
    nextCircles: Color[],
    animation: Animation | null,
    isGameEnd: boolean
};

export const initialState: GameState = {
    gameField: Array(Rows * Rows).fill(null),
    nextCircles: getNextCircles(),
    selected: null,
    score: 0,
    high: 0,
    path: null,
    animation: null,
    isGameEnd: false
};
