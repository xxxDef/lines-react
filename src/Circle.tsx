
import style from "./Circle.module.css";

export type CircleProps = {row: number, col: number, color: number | null};

export function Circle({row, col, color} : CircleProps) {

    const colorStyle = color === null ? null : style["color"+color];
    const classes = colorStyle === null ? "" : `${style.circle} ${colorStyle}`;

    return <div className={classes} id={`circle${row}-${col}`}></div>
}

//{`circle color${color}`}