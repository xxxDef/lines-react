import { useContext } from "react";
import { GameContext } from "./GameContext";

export default function Scores() {
    const game = useContext(GameContext);
    return (
        <div >
            High:
            <div className ="score" id="high">{game.state.high}</div>
            Score:
            <div className="score" id="score">{game.state.score}</div>
        </div>
    )
}
