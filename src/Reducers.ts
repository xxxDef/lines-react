import { GameAction } from "./Actions";
import { GameState, initialState } from "./GameState";
import * as logic from "./logic";

export function gameReducer(state: GameState, action: GameAction): GameState {
    console.log("reducer:", state, action);
    switch (action.type) {
        case "select": { 
            if (action.index === undefined)
                throw "pos isn't initialized";

            const res = {
                ...state,
                selected: action.index
            }          
            return res;
        }
        case "moveTo": return { ...state }
        case "reset": return {  ...initialState, high: state.high }
        
        case "addCircle": return {
            ...state,
            gameField: state.gameField.map((v, i) => 
                i === action.index ? logic.generateColor() : v)
        }
        default: throw `unexpected action ${action.type}`;
    }
}