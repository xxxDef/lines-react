
export const Rows = 9;
export const Colors = 5;

export type Color = number | null;

type Distance = number | null;

export function toIndex(row: number, col: number): number {
    return row * Rows + col;
}

export function forRange<T>(cnt: number, func: (i:number) => T) : T[] {
    return Array.from({length: cnt}, (_, i) => func(i)); 
}

export const getNextRnd = (max: number) => Math.floor(Math.random() * max);

export function getPath(gameField: readonly Color[], start: number, end: number): number[] | null {

    const distances = gameField.map((v, i) => {
        if (i === start)
            return 0;
        if (v !== null)
            return null;    
        return Infinity;
    });

    //logDistances(distances);
    while (fillDistances(distances));

    //logDistances(distances);

    const path = tracePath(distances, end);
    //console.log("trace path", path);
    return path;
}

export function findItemsToRemove(gameField: Color[], minLine = 5): number[] {
    const result: number[] = [];

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

function* generateDirections(): Generator<number | null> {
    // horisontal
    for (let row = 0; row < Rows; ++row) {
        for (let col = 0; col < Rows; ++col)
            yield toIndex(row, col);
        yield null;
    }

    // vertical
    for (let col = 0; col < Rows; ++col) {
        for (let row = 0; row < Rows; ++row)
            yield toIndex( row, col );
        yield null;
    }

    // Enumerate primary diagonals (from top-left to bottom-right)
    for (let diff = -(Rows - 1); diff <= Rows - 1; diff++) {
        for (let row = 0; row < Rows; row++) {
            let col = row - diff;
            if (col >= 0 && col < Rows)
                yield toIndex(row, col);

        }
        yield null;
    }
    // Enumerate secondary diagonals 
    for (let sum = 0; sum <= 2 * (Rows - 1); sum++) {
        for (let row = 0; row < Rows; row++) {
            let col = sum - row;
            if (col >= 0 && col < Rows) {
                yield toIndex( row, col );
            }
        }
        yield null;
    }
}

function* scanForCompletedLinesLines(gameField: Color[], minLine = 5): Generator<number[]> {

    let lineColor: Color | null = null;
    let line: number[] = [];

    for (let pos of generateDirections()) {

        const cellColor = pos === null ? null : gameField[pos];
       
        if (cellColor === null || lineColor === null || cellColor !== lineColor) {
            if (line.length >= minLine)
                yield line;

            if (cellColor != null && pos !== null) {
                line = [pos];
                lineColor = cellColor;
            }
            else {
                line = [];
                lineColor = null;
            }
        }
        else {
            if (pos === null)
                throw "pos should not be null";
            line.push(pos);
        }
    }
    if (line.length !== 0)
        throw "line should be returned inside for";
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

    if (distances[end] === 0)
        return [end];

    const min = findMinNeighbor(distances, end)

    if (min === null)
        throw "alghoritm error: no near neighbor";

    var next = tracePath(distances, min);
    if (next === null)
        throw "invalid algh";

    return [...next, end];
}

function getEmptyPlace(gameField : Color[]) : number | null {
        
    const emptyCells = Array.from(getEmptyCellIndexes(gameField));
    if (emptyCells.length === 0)
        return null;

    const index = getNextRnd(emptyCells.length);
    if (index <0 || index >= emptyCells.length)
        throw Error("invalid rnd for empty cell");
    const res = emptyCells[index];

    if (gameField[res] !== null)
        throw Error("invalid find empty cell");
    return res;
}

function removeItems(gameField: Color[]): RemovingItem[] {
    
    const itemsToRemove = findItemsToRemove(gameField);   
    const res: RemovingItem[] = [];

    for(let index of itemsToRemove) {
        const color = gameField[index];
        if (color === null)
            throw "can't remove empty circle";
        gameField[index] = null;
        res.push({index, color});
    }
    return res;
}

function* getEmptyCellIndexes(gameField: readonly Color[]): Generator<number> {
    for (let i = 0; i < gameField.length; ++i) 
        if (gameField[i] === null)
            yield i;
}
function addItem(gameField: Color[], index: number, color: Color) : number {
    if (gameField[index] !== null) 
        throw Error(`can't add circle in non empty cell gameField[${index}]=${gameField[index]}`);
    gameField[index] = color;
    return index;
}

function getScore(removedCount : number) : number {
    if (removedCount < 5)
        return 0;
    
    return 5 + (removedCount - 5) * 2; // x2 bonus for next    
}

export function getNextCircles() : Color[] {
    return forRange(3, (i) => getNextRnd(Colors));
}

export type RemovingItem = {
    index: number, color: Color
}

type NextTurnResult = {
    gameField: Color[],
    nextCircles: Color[],
    growing: number[],
    removing: RemovingItem[],
    score: number,
    high: number, 
    isGameEnd: boolean;
}
export function nextTurn(gameField: readonly Color[], nextCircles: readonly Color[], score: number, high: number): NextTurnResult {
    
    const newGameField = [...gameField];
    const growing: number[] = []; 

    const removing = removeItems(newGameField);

    let isGameEnd = false;
    if (removing.length === 0) {// no items were removed, add 3 new
        
        for (let nextCircle of nextCircles) {
            let newPlace = getEmptyPlace(newGameField);
            if (newPlace === null) {
                isGameEnd = true;
                break;
            }
            growing.push(addItem(newGameField, newPlace, nextCircle));           
            removing.push(...removeItems(newGameField))
        }
    }

    const newNextCircles = getNextCircles(); 
    const newScore = score + getScore(removing.length);

    const newHigh = isGameEnd && high < newScore ? newScore : high;

    return {
        gameField: newGameField,
        removing: removing,
        growing: growing,
        nextCircles: newNextCircles,
        score: newScore,
        high: newHigh,
        isGameEnd: isGameEnd
    };
}

