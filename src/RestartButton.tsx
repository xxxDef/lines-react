import { useContext } from "react";
import { GameContext } from "./GameContext";

export default function RestartButton() {
    
    const {state, dispatch} = useContext(GameContext);
    
    function click() {
        dispatch({type:"reset"});
        dispatch({type:"nextTurn"});

    }
    return (
        <div><button id="restart" onClick={click}>Restart</button></div>
    );
}