
export default function Cell({row, col}: {row:number, col: number}) {
    return (
        <div className='cell' id={`cell${row}-${col}`}>
            <div id={`circle${row}-${col}`}></div>
        </div>
    );
}