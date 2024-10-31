export const Rows = 9;
export const Colors = 5;

type Pos = { readonly row: number, readonly col: number };
type Color = number;

type Distance = number | null;
type Distances = Distance[][];

class GameCell {
    color : Color | null = null;
}

class LinesGame {
    getCell(row:number, col: number): GameCell {
        return new GameCell();
    }
}

export function forRange<T>(cnt: number, func: (i:number) => T) : T[] {
    return Array.from({length: cnt}, (_, i) => func(i)); 
}

export const getNextRnd = (max: number) => Math.floor(Math.random() * max);
export const generateColor = () => getNextRnd(Colors);

export function getPath(gameField: LinesGame, source: GameCell, target: Pos): Pos[] {

    const field = createField(gameField, source);

    while (fillDistances(field));

    return tracePath(field, target);
}

export function findItemsToRemove(gameField: LinesGame, minLine = 5): GameCell[] {
    const result: GameCell[] = [];

    for (let line of scanForCompletedLinesLines(gameField, minLine))
        result.push(...line);
    return result;
}

function* getNeighbors(cur: Pos): Generator<Pos> {
    if (cur.row > 0)
        yield { row: cur.row - 1, col: cur.col };
    if (cur.row < Rows - 1)
        yield { row: cur.row + 1, col: cur.col };
    if (cur.col > 0)
        yield { row: cur.row, col: cur.col - 1 };
    if (cur.col < Rows - 1)
        yield { row: cur.row, col: cur.col + 1 };
}

function* getAvailableNeighbors(distances: Distances, curPos: Pos): Generator<Pos> {

    for (let pos of getNeighbors(curPos)) {
        if (distances[pos.row][pos.col] != null)
            yield pos;
    }
}

function findMinDistance(distances: Distances, pos: Pos): { pos: Pos, distance: Distance } | null {

    let resPos: Pos | null = null;
    let resDist: Distance = null;

    const available = getAvailableNeighbors(distances, pos);

    for (let pos of available) {
        const curDist = distances[pos.row][pos.col];
        if (curDist === null)
            continue;

        if (resDist === null || curDist < resDist) {
            resPos = pos;
            resDist = curDist;
        }
    }
    if (resPos === null)
        return null;
    return { pos: resPos, distance: resDist };
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

function createField(gameField: LinesGame, source: GameCell): Distances {
    return Array.from(
        { length: Rows }, (_, row) => Array.from(
            { length: Rows }, (_, col) => {
                const cell = gameField.getCell(row, col);
                return cell === source ? 0               // source
                    : cell.color === null ? Infinity    // possible target
                        : null;                             // occuped
            }));
}

function fillDistances(distances: Distances): number {
    let found = 0;
    for (let row = 0; row < distances.length; ++row) {
        for (let col = 0; col < distances[row].length; ++col) {
            const curLen = distances[row][col];
            if (curLen === null) // occuped
                continue;

            const min = findMinDistance(distances, { row, col });

            if (min === null) {
                // no neighbors arround, exclude from next calculation
                distances[row][col] = null;
                continue;
            }

            if (min.distance === Infinity) {
                // no already calculated neighbords arround, skip this step 
                continue;
            }

            if (min.distance === null)
                throw "invalid alghoritm: should be not null";

            const nextStep = min.distance + 1;
            if (curLen > nextStep) {
                distances[row][col] = nextStep;
                found++;
            }
        }
    }
    return found;
}

export function tracePath(distances: Distances, curPos: Pos): Pos[] {

    const min = findMinDistance(distances, curPos)

    if (min === null)
        throw "alghoritm error: no near neighbor";

    if (min.distance === 0)
        return [min.pos];

    var next = tracePath(distances, min.pos);
    return [...next, min.pos];
}

