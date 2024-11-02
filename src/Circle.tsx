import style from "./Circle.module.css";

export type CircleProps = {
    index: number, 
    color: number | null,
    selected: boolean 
};

export function Circle({index, color, selected} : CircleProps) {

    const classes: string[] = [];
    if (color != null) {
        classes.push(style["color"+color]);
        classes.push(style.circle);       
    };
       
    if (selected) {
        classes.push(style.selected);
    }

    return <div className={classes.join(' ')} id={`circle${index}`}></div>
}
