import style from "./Circle.module.css";
import {Color}  from "./logic";

export type CircleProps = {
    index: number, 
    color: Color,
    selected: boolean,
    pathColor: Color
};

export function Circle({index, color, selected, pathColor} : CircleProps) {

    const classes: string[] = [];
    if (color !== null) {
        classes.push(style["color"+color]);
        classes.push(style.circle);       
    }
    else if (pathColor !== null) {
        classes.push(style["color"+pathColor]);
        classes.push(style.circle);   
        classes.push(style.path);   
    }
       
    if (selected) {
        classes.push(style.selected);
    }

    return <div className={classes.join(' ')} id={`circle${index}`}></div>
}
