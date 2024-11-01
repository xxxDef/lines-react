import * as logic from './logic'

type action = "select" | "moveTo" | "reset";

export type GameAction = {
    type: action,
    pos: logic.Pos | null
}
