import { log } from "console";
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
        case "moveTo": {
            if (action.index === undefined)
                throw "pos isn't initialized";

            if (state.selected === null)
                return {...state};

            const path = logic.getPath(state.gameField, state.selected, action.index);
            if (path === null)
                return {...state}; // no way 

            const curColor = state.gameField[state.selected];
            if (curColor === null)
                throw "invalid algh";

            return {
                ...state,
                selected: null,
                path: path,
                pathColor: curColor,
                gameField : state.gameField.map((v,i) => {
                    if (i === state.selected)
                        return null; // remove color in start pos
                    if (i === action.index) 
                        return curColor; // set moved circle in new pos                    
                    return v;
                })
            };
        }
        
        case "reset": return {  ...initialState, high: state.high }
        
        case "addCircle": return {
            ...state,
            gameField: state.gameField.map((v, i) => 
                i === action.index ? logic.generateColor() : v)
        }
        
        default: throw `unexpected action ${action.type}`;
    }
}