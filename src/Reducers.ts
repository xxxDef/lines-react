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
        
        case "reset": return {  
            ...initialState, 
            high: state.high 
        }
        
        case "addCircle": return {
            ...state,
            gameField: state.gameField.map((v, i) => 
                i === action.index ? logic.getNextRnd(logic.Colors) : v)
        }

        case "clearPath" : {
            if (state.path === null) 
                throw "invalid algh, path should not be null here";
            if (state.path.curIndex + 1 !== state.path.cells.length)
                throw "invalid alg";
            return {
                ...state,
                path: null
            };
        }

        case "tracePath" : {

            if (state.path === null) 
                throw "invalid algh, path should not be null here";
            const newStep = state.path.curIndex + 1;
            if (newStep >= state.path.cells.length) 
                throw "invalid alg";
            
            return {
                ...state,
                path: {
                    ...state.path,
                    curIndex: newStep
                } 
            };
        }

        case "nextTurn": {

            const nextTurnInfo = logic.nextTurn(state.gameField, state.nextCircles, state.score, state.high);
            const needAnimation = nextTurnInfo.removing?.length > 0 || nextTurnInfo.growing?.length > 0;
            return {
                ...state,
                gameField: nextTurnInfo.gameField,
                score: nextTurnInfo.score,
                high: nextTurnInfo.high,
                nextCircles: nextTurnInfo.nextCircles,
                isGameEnd: nextTurnInfo.isGameEnd,
                animation: !needAnimation ? null : {
                    animation: 33,
                    growing: nextTurnInfo.growing,
                    removing: nextTurnInfo.removing
                }
            };
        }

        case "animate": {
            if (state.animation === null)
                throw "invlid animation";
            if (state.animation.animation > 0) {
                return {
                    ...state,
                    animation: {
                        ...state.animation,
                        animation: state.animation.animation - 1
                    }
                }
            } 
            else {
                return {
                    ...state,
                    animation: null,
                }
            }

        }

        
        default: throw `unexpected action ${action.type}`;
    }
}