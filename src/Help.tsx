
export default function Help() {
    return (
        <details className="inline">
            <summary>Help</summary>
            <div>
                move a ball, click on it with the mouse (circle will appear) to select it, then click on a free cell in a field. To deselect a ball just click on another. If movement is possible, ball will go to the specified empty field. After each turn, 3 new balls are placed on a field (random colours & positions). Preview panel shows colours of the next 3 balls. You can always force the next turn without moving anything. Click on preview panel. If the game field is full, game is over.
                Game goal is to arrange balls of the same colour in a straight lines (every direction). 5 or more balls on a straight line are removed and points are given. Longer lines give more points to you. Crossing lines count together.
            </div>
        </details>
    );
}