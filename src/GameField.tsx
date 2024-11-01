import * as logic from "./logic"
import Row from "./Row"

export default function GameField() {
    return (
        <div id="gameField">
            {logic.forRange(logic.Rows, (row) => (
                <Row row={row} key={row}/>         
            ))}
        </div>
    );
}
