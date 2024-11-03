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
                path: {
                    cells: path,
                    color: curColor,
                    curIndex: 0
                },
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

        case "movePath" : {

            if (state.path === null) 
                throw "invalid algh, path should not be null here";
            const newStep = state.path.curIndex + 1;
            if (newStep >= state.path.cells.length) {
                // finish showing path
                console.log("stop tracing path");
                return {
                    ...state,
                    path: null
                };
            }
            else {
                console.log("next tracing path", newStep);
                return {
                    ...state,
                    path: {
                        ...state.path,
                        curIndex: newStep
                    } 
                };
            }
            
        }
        
        default: throw `unexpected action ${action.type}`;
    }
}