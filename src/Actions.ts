import * as logic from './logic'

type action = "select" | "moveTo" | "reset" | "addCircle";

export type GameAction = {
    type: action,
    index?: number
}
