import { GameAction } from "./Actions";
import { GameState } from "./GameState";

export function gameReducer(state: GameState, action: GameAction): GameState {
    console.log("reducer:", state, action);
    switch (action.type) {
        case "select": {           
            const res = {
                ...state,
                selected: action.pos
            }          
            return res;
        }
        case "moveTo": return { ...state }
        default: throw `unexpected action ${action.type}`;
    }
}