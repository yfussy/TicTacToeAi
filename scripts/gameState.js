export class GameState {
    board;
    boardLog;
    playerOneMarker;
    playerTwoMarker;
    gameState = true;
    playerOne;
    playerTwo;

    constructor(sides) {
        this.playerOneMarker = sides.playerOneMarker;
        this.playerTwoMarker = sides.playerTwoMarker;
        this.board = sides.board;
        this.boardLog = [JSON.parse(JSON.stringify(this.board))]
        this.playerOne = sides.playerOne;
        this.playerTwo = sides.playerTwo;
    }

    #copyList(list) {
        return JSON.parse(JSON.stringify(list));
    }

    drawBoard() {
        document.querySelectorAll('.js-place-marker').forEach((button, i) => {
            button.innerHTML = this.board[i];
        });
        return;
    }
    
    makeMove(move) {
        this.board[move] = this.playerOne? this.playerOneMarker: this.playerTwoMarker;
        this.boardLog.unshift(this.#copyList(this.board));
        this.playerOne = !this.playerOne;
        this.playerTwo = !this.playerTwo;
        return;
    }
    
    undoMove() {
        this.board = this.#copyList(this.boardLog[1]);
        this.boardLog.shift();
        this.playerOne = !this.playerOne;
        this.playerTwo = !this.playerTwo;
        this.gameState = true;
        return;
    }
    
    checkWinner(side) {
        // check horizontally
        for (let i = 0; i <= 6; i += 3) {
            if (
            this.board[i] === side &&
            this.board[i] !== ' ' &&
            this.board[i] === this.board[i + 1] &&
            this.board[i + 1] === this.board[i + 2]
            ) {
            return true;
            }
        }
    
        // check vertically
        for (let i = 0; i <= 2; i++) {
            if (
            this.board[i] === side &&
            this.board[i] !== ' ' &&
            this.board[i] === this.board[i + 3] &&
            this.board[i + 3] === this.board[i + 6]
            ) {
            return true;
            }
        }
    
        // check diagonally
        if (
            this.board[4] === side &&
            this.board[4] !== ' ' &&
            ((this.board[0] === this.board[4] && this.board[4] === this.board[8]) ||
            (this.board[2] === this.board[4] && this.board[4] === this.board[6]))
        ) {
            return true;
        }

        return false;
    }
    
    checkTie() {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == ' ') {
                return false;
            }
        }
        return true;
    }

    gameOver() {
        return this.checkWinner(this.playerOneMarker) || this.checkWinner(this.playerTwoMarker) || this.checkTie();
    }
}


export const test_gs = new GameState({
    playerOneMarker: 'O',
    playerTwoMarker: 'X',
    board: ['-', 'O', 'O', 'O', 'X', 'X', 'X', '-', '-']
});
