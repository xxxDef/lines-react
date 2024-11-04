import style from "./Circle.module.css";
import {Color}  from "./logic";

export type CircleProps = {
    index: number, 
    color: Color,
    effect: CircleEffect
};

export enum CircleEffect {
    None,
    Path,
    Growing,
    Removing,
    Selected
}
export function Circle({index, color, effect} : CircleProps) {

    const classes: string[] = [];
    if (color !== null) {
        classes.push(style["color"+color]);
        classes.push(style.circle);       
    }

    switch (effect) {
        case CircleEffect.Path: 
            classes.push(style.path);  
            break;
        case CircleEffect.Selected:
            classes.push(style.selected);
            break;
        case CircleEffect.Removing:
            classes.push(style.removing);
            break;
                
        case CircleEffect.Growing:
            classes.push(style.growing);
            break;
            
            case CircleEffect.None:
                break;
        default:
            throw "unknow effect";       
    }
    
    return <div className={classes.join(' ')} id={`circle${index}`}></div>
}
