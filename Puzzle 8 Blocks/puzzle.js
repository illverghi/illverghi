const puzzleCompleted = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 0]
];
let puzzleState = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 0]
];

let winCounter = 0;
let moveCounter = 0;
shufflePuzzle(puzzleState);
function shufflePuzzle(puzzle) {
    for (let i = puzzle.length - 1; i > 0; i--) {
        for (let j = puzzle[i].length - 1; j > 0; j--) {
            let i1 = Math.floor(Math.random() * (i + 1));
            let j1 = Math.floor(Math.random() * (j + 1));

            const temp = puzzle[i][j];
            puzzle[i][j] = puzzle[i1][j1];
            puzzle[i1][j1] = temp;
        }
    }
    
    moveCounter = 0;
    document.getElementById('moveCounter').textContent = moveCounter;
    console.log(puzzle);
}

function renderPuzzle(puzzle) { 
    const puzzleContainer = document.getElementById('puzzleContainer');
    puzzleContainer.innerHTML = null;

    for (let row of puzzle) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('puzzle-row');

        for (let cell of row) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('puzzle-cell');
            cellElement.textContent = cell !== 0 ? cell : '';
            cellElement.dataset.row = puzzle.indexOf(row);
            cellElement.dataset.col = row.indexOf(cell);
            rowElement.appendChild(cellElement);
        }

        puzzleContainer.appendChild(rowElement);
        refers();
    }
    checkWin();
}

renderPuzzle(puzzleState);

document.getElementById("shuffleButton").addEventListener('click', () => {
    //alert('Shuffling the puzzle');
    shufflePuzzle(puzzleState);
    renderPuzzle(puzzleState);
        
    let cells = document.getElementsByClassName("puzzle-cell");
    Array.from(cells).forEach(cell => {
        if(cell.textContent !== '') {
            cell.addEventListener('click', (event) => {
                refers();
            });
        }
    });
});

function getCellValue(puzzle, row, col) {
    if (row >= 0 && row < puzzle.length && col >= 0 && col < puzzle[row].length) {
        return puzzle[row][col];
    } else {
        alert('Non esiste una cella con queste info');
    }
}

function refers(){
    let cells = document.getElementsByClassName("puzzle-cell");
    Array.from(cells).forEach(cell => {
        if(cell.textContent !== '') {
            cell.addEventListener('click', (event) => {
                let row = parseInt(cell.dataset.row);
                let col = parseInt(cell.dataset.col);
    
                let adjacentCells = [
                    { row: row - 1, col: col }, // above
                    { row: row + 1, col: col }, // below
                    { row: row, col: col - 1 }, // left
                    { row: row, col: col + 1 }  // right
                ];
    
                for (let adj of adjacentCells) {
                    if (adj.row >= 0 && adj.row < puzzleState.length && adj.col >= 0 && adj.col < puzzleState[adj.row].length) {
                        if (puzzleState[adj.row][adj.col] === 0) {
                            puzzleState[adj.row][adj.col] = puzzleState[row][col];
                            puzzleState[row][col] = 0;
                            renderPuzzle(puzzleState);
                            moveCounter = moveCounter+1;
                            document.getElementById('moveCounter').textContent = moveCounter;
                        }
                    }
                }
                //console.log('Cell clicked:', cell.dataset.row, cell.dataset.col);
                //let cellValue = getCellValue(puzzleState, cell.dataset.row, cell.dataset.col);
                //console.log('Cell value:', cellValue);
            });
        }
    });    
}
function checkWin(){
    let checker = JSON.stringify(puzzleCompleted) === JSON.stringify(puzzleState);
    if(checker){
        winCounter = winCounter+1;
        document.getElementById('winCounter').textContent = winCounter;
        alert('Hai vinto');
    }   
}