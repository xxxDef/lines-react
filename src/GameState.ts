import * as logic from "./logic"

export type GameState = {

    selected: logic.Pos | null,
    high: number,
    score: number
};

export const initialState: GameState = {
    selected: null,
    score: 0,
    high: 0
};
