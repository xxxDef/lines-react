import { stringify } from "querystring";
import Row from "./Row";

export const Rows = 9;
export const Colors = 5;

export type Pos = { readonly row: number, readonly col: number };
export type Color = number | null;

type Distance = number | null;


class GameCell {
    color : Color | null = null;
}

class LinesGame {
    getCell(row:number, col: number): GameCell {
        return new GameCell();
    }
}

export function toIndex(row: number, col: number): number {
    return row * Rows + col;
}

export function forRange<T>(cnt: number, func: (i:number) => T) : T[] {
    return Array.from({length: cnt}, (_, i) => func(i)); 
}

export const getNextRnd = (max: number) => Math.floor(Math.random() * max);
export const generateColor = () => getNextRnd(Colors);

export function getPath(gameField: Color[], start: number, end: number): number[] | null {

    const distances = gameField.map((v, i) => {
        if (i === start)
            return 0;
        if (v !== null)
            return null;    
        return Infinity;
    });

    logDistances(distances);
    while (fillDistances(distances));

    return tracePath(distances, end);
}

export function findItemsToRemove(gameField: LinesGame, minLine = 5): GameCell[] {
    const result: GameCell[] = [];

    for (let line of scanForCompletedLinesLines(gameField, minLine))
        result.push(...line);
    return result;
}

function* getNeighbors(index: number): Generator<number> {
    
    const row = Math.floor(index/Rows);
    const col = index % Rows;
    if (row > 0)
        yield toIndex(row - 1, col);
    if (row < Rows - 1)
        yield toIndex(row + 1, col)
    if (col > 0)
        yield toIndex(row, col - 1);
    if (col < Rows - 1)
        yield toIndex(row, col + 1);
}

function findMinNeighbor(distances: Distance[], index: number): number | null {

    let res: number | null = null;

    const neighbors = getNeighbors(index);

    for (let i of neighbors) {
        const curDist = distances[i];
        if (curDist === null)
            continue;

        if (res === null) {
            res = i;
            continue;
        }

        const resDist = distances[res];
        if (resDist === null)
            throw "algh error";

        if (curDist < resDist) {
            res = i;
        }
    }
    return res;
}

function* generateDirections(): Generator<Pos | null> {
    // horisontal
    for (let row = 0; row < Rows; ++row) {
        for (let col = 0; col < Rows; ++col)
            yield { row, col };
        yield null;
    }

    // vertical
    for (let col = 0; col < Rows; ++col) {
        for (let row = 0; row < Rows; ++row)
            yield { row, col };
        yield null;
    }

    // Enumerate primary diagonals (from top-left to bottom-right)
    for (let diff = -(Rows - 1); diff <= Rows - 1; diff++) {
        for (let row = 0; row < Rows; row++) {
            let col = row - diff;
            if (col >= 0 && col < Rows)
                yield { row, col };

        }
        yield null;
    }
    // Enumerate secondary diagonals 
    for (let sum = 0; sum <= 2 * (Rows - 1); sum++) {
        for (let row = 0; row < Rows; row++) {
            let col = sum - row;
            if (col >= 0 && col < Rows) {
                yield { row, col };
            }
        }
    }
}

function* scanForCompletedLinesLines(gameField: LinesGame, minLine = 5): Generator<GameCell[]> {

    let color: Color | null = null;
    let line: GameCell[] = [];

    for (let pos of generateDirections()) {

        const cell = pos === null ? null : gameField.getCell(pos.row, pos.col);

        if (cell === null || color === null || cell.color !== color) {
            if (line.length >= minLine)
                yield line;

            if (cell != null) {
                line = [cell];
                color = cell.color;
            }
            else {
                line = [];
                color = null;
            }
        }
        else {
            line.push(cell);
        }
    }
}

function fillDistances(distances: (number|null)[]): number {
    let found = 0;

    for(let i = 0; i < distances.length; ++i) {
        
        const curDist = distances[i];
        if (curDist === null)
            continue; // occuped

        const min = findMinNeighbor(distances, i);
        if (min === null) {
            // no neighbors arround, exclude from next calculation
            distances[i] = null;
            continue;
        }

        const minDist = distances[min];
        if (minDist === null)
            throw "invalid alghoritm";

        if (minDist === Infinity) {
            // no already calculated neighbords arround, skip this step 
            continue;
        }

        const nextDist = minDist+1;
        if (nextDist < curDist) {
            distances[i] = nextDist;
            found++;
        }        
    }

    logDistances(distances);

    
    return found;
}

function logDistances(distances: Distance[]) {
    const res: string[] = [];
    let cur: string[] = [];
    for (let d of distances) {
        const ch = d === null ? "XX"
            : d === Infinity ? "In"
            : d.toString().padStart(2, "0");
        cur.push(ch);
        if (cur.length === Rows) {
            res.push(cur.join(" "));
            cur = [];
        }
    }
    console.log(res.join("\n"));
}

export function tracePath(distances: Distance[], end: number): number[] | null{

    if (distances[end] === null)
        throw "invalid args";
    if (distances[end] === Infinity)
        return null; // no path

    const min = findMinNeighbor(distances, end)

    if (min === null)
        throw "alghoritm error: no near neighbor";

    if (distances[min] === 0)
        return [min, end];

    var next = tracePath(distances, min);
    if (next === null)
        throw "invalid algh";

    return [...next, min];
}

