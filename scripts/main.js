import { gs } from "./gameState.js";
import { findBestMove } from "./gameAi.js";

function computerMakeRandomMove() {
    while (true) {
        if (gs.checkTie() || gs.checkWinner(gs.playerMarker) || gs.checkWinner(gs.computerMarker)) {
            break;
        }
        let move = Math.floor(Math.random() * 8);
        if (gs.board[move] == ' ') {
            gs.makeMove(move);
            break; 
        }
    }
}

function computerMakeMove(game) {
    let move = findBestMove(game);
    gs.makeMove(move);
    return;
}

function init() {
    document.querySelectorAll('.js-place-marker').forEach(button => {
        button.addEventListener('click', () => {
            let header = document.querySelector('.js-game-state');
            if (gs.gameState) {
                if (gs.playerToMove) {
                    let move = button.dataset.gridId;
                    if (gs.board[move] == ' ') {
                        gs.makeMove(move, gs.playerMarker);
                        gs.drawBoard();
                    } else {
                        header.innerHTML = "This place is occupy!";
                        return;
                    } 
                } else {
                    return;
                }
    
                if (gs.checkWinner(gs.playerMarker)) {
                    header.innerHTML = "You Win!";
                    gs.gameState = false
                } else if (gs.checkTie()) {
                    header.innerHTML = "It's a Tie...";
                    gs.gameState = false;
                } else {
                    header.innerHTML = "Computer making move...";
    
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                        }, 500);    
                    }).then(() => {
                        computerMakeRandomMove(gs);
                        gs.drawBoard();
                    }).then(() => {
                        if (gs.checkWinner(gs.computerMarker)) {
                            header.innerHTML = "Computer Wins!";
                            gs.gameState = false
                        } else {
                            if (gs.checkTie()) {
                                header.innerHTML = "It's a Tie...";
                                gs.gameState = false;
                            }
                            header.innerHTML = "It's your turn!"
                        }
                    });
                }
            }
        });
    });
}
    
init();