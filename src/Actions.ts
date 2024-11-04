
type action = "select" 
    | "moveTo" 
    | "reset" 
    | "addCircle" 
    | "tracePath" 
    | "clearPath" 
    | "nextTurn"
    | "animate";

export type GameAction = {
    type: action,
    index?: number
}

