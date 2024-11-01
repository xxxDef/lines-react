import style from "./Circle.module.css";

export type CircleProps = {
    row: number, 
    col: number, 
    color: number | null,
    selected: boolean 
};

export function Circle({row, col, color, selected} : CircleProps) {

    const classes: string[] = [];
    if (color != null) {
        classes.push(style["color"+color]);
        classes.push(style.circle);       
    };
       
    if (selected) {
        classes.push(style.selected);
    }

    return <div className={classes.join(' ')} id={`circle${row}-${col}`}></div>
}
