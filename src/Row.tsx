import * as logic from "./logic"
import Cell from "./Cell";
import "./Row.css";

export default function Row({row } : {row: number}) {
    return (
        <div id={"row"+row} className="row">
            {logic.forRange(logic.Rows, (col) => (
                <Cell row={row} col={col} key={col}/> 
            ))}           
        </div>
    )
}