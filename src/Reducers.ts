import { GameAction } from "./Actions";
import { GameState, initialState } from "./GameState";

export function gameReducer(state: GameState, action: GameAction): GameState {
    console.log("reducer:", state, action);
    switch (action.type) {
        case "select": { 
            if (action.pos === undefined)
                throw "pos isn't initialized";

            const res = {
                ...state,
                selected: action.pos
            }          
            return res;
        }
        case "moveTo": return { ...state }
        case "reset": return {  ...initialState, high: state.high }
        default: throw `unexpected action ${action.type}`;
    }
}