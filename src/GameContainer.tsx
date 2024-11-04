
import TopPane from "./TopPane"
import GameField from './GameField';
import BottomPane from './BottomPane';
import GameProvider from './GameContext';

function GameContainer() {
    return (
        <div id="gameContainer">
            <GameProvider>
                <TopPane/>            
                <GameField/>
                <BottomPane/>   
            </GameProvider>   
        </div>
    );
}

export default GameContainer;