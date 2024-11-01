import NextBalls from "./NextBalls";
import RestartButton from "./RestartButton";
import Scores from "./Scores";

export default function TopPane() {
    return (
        <div id="topPane">
            <NextBalls></NextBalls>
            <RestartButton/>
            <Scores/>                           
        </div>
    );
}
