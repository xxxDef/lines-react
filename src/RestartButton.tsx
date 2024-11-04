import { useContext } from "react";
import { GameContext } from "./GameContext";
import styles from "./RestartButton.module.css";

export default function RestartButton() {
    
    const {dispatch} = useContext(GameContext);
    
    function click() {
        dispatch({type:"reset"});
        dispatch({type:"nextTurn"});
    }
    return (
        <div><button className={styles.restartButton} id="restart" onClick={click}>Restart</button></div>
    );
}