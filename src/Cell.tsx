import { CSSProperties } from "react";
import styles from "./Cell.module.css";
import { Circle, CircleProps } from "./Circle";

export default function Cell({row, col}: {row:number, col: number}) {

    return (
        <div className={styles.cell} id={`cell${row}-${col}`}>
            <Circle row={row} col={col} color={1}/>
        </div>
    );
}