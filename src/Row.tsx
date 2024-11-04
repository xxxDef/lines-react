import {forRange, Rows, toIndex} from "./logic"
import Cell from "./Cell";
import styles from "./Row.module.css";

export default function Row({row } : {row: number}) {

    return (       
        <div id={"row"+row} className={styles.row}>
            {forRange(Rows, (col) => (
                <Cell index={toIndex(row,col)} key={toIndex(row,col)}/> 
            ))}           
        </div>
    )
}