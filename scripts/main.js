import { GameState } from "./gameState.js";
import { displayBoardLog, findBestMove } from "./gameAi.js";

const gs = new GameState({
    playerOneMarker: 'X',
    playerTwoMarker: 'O',
    board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    playerOne: true,
    playerTwo: false
});

function computerMakeRandomMove(game) {
    while (true) {
        if (game.checkTie() || game.checkWinner(game.playerOneMarker) || game.checkWinner(game.playerTwoMarker)) {
            break;
        }
        let move = Math.floor(Math.random() * 8);
        if (game.board[move] == ' ') {
            game.makeMove(move);
            break; 
        }
    }
}

function computerMakeBestMove(game) {
    let move = findBestMove(game);
    console.log(`Next move: ${move}`);
    if (move != undefined) {
        console.log("MAKING GENIUS MOVE!");
        game.makeMove(move);
    } else {
        console.log("making random move...");
        computerMakeRandomMove(game);
    }
    return;
}

function init(game) {
    let header = document.querySelector('.js-game-state');
    
    document.querySelectorAll('.js-place-marker').forEach(button => {
        button.addEventListener('click', () => {
            
            if (game.gameState) {
                if (game.playerOne) {
                    let move = button.dataset.gridId;
                    if (game.board[move] == ' ') {
                        game.makeMove(move, game.playerOneMarker);
                        console.log(`Current board: ${game.board}`);
                        game.drawBoard();
                    } else {
                        header.innerHTML = "This place is occupy!";
                        return;
                    } 
                } else {
                    return;
                }
    
                if (game.checkWinner(game.playerOneMarker)) {
                    header.innerHTML = "You Win!";
                    game.gameState = false
                    displayBoardLog(game.boardLog);
                } else if (game.checkTie()) {
                    header.innerHTML = "It's a Tie...";
                    game.gameState = false;
                    displayBoardLog(game.boardLog);
                } else {
                    header.innerHTML = "Computer making move...";
    
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                        }, 500);    
                    }).then(() => {
                        computerMakeBestMove(game);
                        game.drawBoard();
                    }).then(() => {
                        if (game.checkWinner(game.playerTwoMarker)) {
                            header.innerHTML = "Computer Wins!";
                            game.gameState = false;
                            displayBoardLog(game.boardLog);
                        } else {
                            if (game.checkTie()) {
                                header.innerHTML = "It's a Tie...";
                                game.gameState = false;
                                displayBoardLog(game.boardLog);
                            }
                            header.innerHTML = "It's your turn!"
                        }
                    });
                }
            }

        });
    });

    if (game.playerTwo) {
        header.innerHTML = "Computer making move...";
    
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 500);    
        }).then(() => {
            computerMakeBestMove(game);
            game.drawBoard();
        }).then(() => {
            if (game.checkWinner(game.playerTwoMarker)) {
                header.innerHTML = "Computer Wins!";
                game.gameState = false
            } else {
                if (game.checkTie()) {
                    header.innerHTML = "It's a Tie...";
                    game.gameState = false;
                }
                header.innerHTML = "It's your turn!"
            }
        });
    }
}
    
init(gs);