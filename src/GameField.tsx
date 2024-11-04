import {forRange, Rows} from "./logic"
import Row from "./Row"

export default function GameField() {
    return (
        <div id="gameField">
            {forRange(Rows, (row) => (
                <Row row={row} key={row}/>         
            ))}
        </div>
    );
}
