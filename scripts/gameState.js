export default class GameState {
    board;
    boardLog;
    currentMove;
    playerOneMarker;
    playerTwoMarker;
    gameState = true;
    playerOne;
    playerTwo;

    constructor(sides) {
        this.playerOneMarker = sides.playerOneMarker;
        this.playerTwoMarker = sides.playerTwoMarker;
        this.board = sides.board;
        this.boardLog = [this.#copyList(this.board)];
        this.playerOne = sides.playerOne;
        this.playerTwo = sides.playerTwo;
    }

    #copyList(list) {
        return JSON.parse(JSON.stringify(list));
    }

    getCurrentMove() {
        for (let i = 0; i < 9; i++) {
            if (this.boardLog[0][i] !== this.boardLog[1][i]) {
                return i;
            }
        }
        return;
    }

    drawBoard() {
        document.querySelectorAll('.js-place-marker').forEach((button, i) => {
            let buttonInnerHTML = ``;

            if (i === this.currentMove) {
                buttonInnerHTML = 
                `
                    <div class="animate">
                        ${this.board[i]}
                    </div>
                `;
            } else {
                buttonInnerHTML = 
                `
                    <div>
                        ${this.board[i]}
                    </div>
                `;
            }

            button.innerHTML = buttonInnerHTML;
        });
        return;
    }

    resetBoard() {
        this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        this.boardLog = [this.#copyList(this.board)];
        this.gameState = true;
        this.currentMove = undefined;
        this.playerOne = true;
        this.playerTwo = false;
        this.drawBoard();
        this.changeSideHTML();
        return;
    }

    changeSideHTML() {
        let turnInnerHTML = ``;
        if (this.playerOne) {
            turnInnerHTML = 
            `
                <div class="square ${this.playerOneMarker} pop-in"></div>
                <div class="square ${this.playerTwoMarker}"></div>
            `;
        } else {
            turnInnerHTML = 
            `
                <div class="square ${this.playerOneMarker}"></div>
                <div class="square ${this.playerTwoMarker} pop-in"></div>
            `;
        }
        
        document.querySelector(".js-turn").innerHTML = turnInnerHTML;
        return;
    }

    changePlayer() {
        this.playerOne = !this.playerOne;
        this.playerTwo = !this.playerTwo;
        this.changeSideHTML();
    }   

    makeMove(move) {
        this.board[move] = this.playerOne? this.playerOneMarker: this.playerTwoMarker;
        this.boardLog.unshift(this.#copyList(this.board));
        this.currentMove = this.getCurrentMove();
        this.changePlayer();
        return;
    }
    
    undoMove() {
        this.board = this.#copyList(this.boardLog[1]);
        this.boardLog.shift();
        this.changePlayer();
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
