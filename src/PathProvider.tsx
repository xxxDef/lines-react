import { ReactNode, useContext, useEffect } from "react";
import {GameContext} from "./GameContext";

export default function PathProvider({children}: { children: ReactNode }) {
    const {state, dispatch} = useContext(GameContext);

    useEffect(() => {

        if (state.path === null) // path became null, do nothing after this
            return;

        // path just turned to not null - setup timer. Timer will be cleaned when path changed (i.e. when it will be turned to null again)
        const intervalId = setInterval(() => {
            console.log("dispatch - move path");
            dispatch( {type: "movePath"})
        }, 30);

        return () => {
            console.log("clear timer for moving path");
            clearInterval(intervalId);
        }
    }, [state.path])

    return <>{children}</>
}