class GameState {
    board;
    boardLog;
    playerMarker;
    computerMarker;
    gameState = true;
    playerToMove = false;
    computerToMove = true;

    constructor(sides) {
        this.playerMarker = sides.playerMarker;
        this.computerMarker = sides.computerMarker;
        this.board = sides.board;
        this.boardLog = [JSON.parse(JSON.stringify(this.board))]
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
        this.board[move] = this.playerToMove? this.playerMarker: this.computerMarker;
        this.boardLog.unshift(this.#copyList(this.board));
        this.playerToMove = !this.playerToMove;
        this.computerToMove = !this.computerToMove;
        return;
    }
    
    undoMove() {
        this.board = this.#copyList(this.boardLog[1]);
        this.boardLog.shift();
        this.playerToMove = !this.playerToMove;
        this.computerToMove = !this.computerToMove;
        return;
    }
    
    checkWinner(side) {
        if ((this.board[0] == side) && (this.board[0] != ' ') && (this.board[0] == this.board[1]) && (this.board[1] == this.board[2])) {
            return true;
        } else if ((this.board[3] == side) && (this.board[3] != ' ') && (this.board[3] == this.board[4]) && (this.board[4] == this.board[5])) {
            return true;
        } else if ((this.board[6] == side) && (this.board[6] != ' ') && (this.board[6] == this.board[7]) && (this.board[7] == this.board[8])) {
            return true;
        } else if ((this.board[0] == side) && (this.board[0] != ' ') && (this.board[0] == this.board[3]) && (this.board[3] == this.board[6])) {
            return true;
        } else if ((this.board[1] == side) && (this.board[1] != ' ') && (this.board[1] == this.board[4]) && (this.board[4] == this.board[7])) {
            return true;
        } else if ((this.board[2] == side) && (this.board[2] != ' ') && (this.board[2] == this.board[5]) && (this.board[5] == this.board[8])) {
            return true;
        } else if ((this.board[0] == side) && (this.board[0] != ' ') && (this.board[0] == this.board[4]) && (this.board[4] == this.board[8])) {
            return true;
        } else if ((this.board[2] == side) && (this.board[2] != ' ') && (this.board[2] == this.board[4]) && (this.board[4] == this.board[6])) {
            return true;
        } else {
            return false
        }
    }
    
    checkTie() {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == '-') {
                return false;
            }
        }
        return true;
    }
}

export const gs = new GameState({
    playerMarker: 'X',
    computerMarker: 'O',
    board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
});

export const test_gs = new GameState({
    playerMarker: 'O',
    computerMarker: 'X',
    board: ['-', 'O', 'O', 'O', 'X', 'X', 'X', '-', '-']
});
