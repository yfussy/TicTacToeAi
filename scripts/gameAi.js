import { test_gs } from "./gameState.js";

const WIN = 1;
var nextMove;
var counter = 0;
var depth = 0;

export function displayArray(arr) {
    console.log(`Current Arr:`)
        arr.forEach(elem => {
            console.log(`${elem}`);
        });
}


export function findBestMove(game) {
    let validMoves = getValidMoves(game);
    console.log(`Starting board: ${game.board}`);
    // findMoveNegaMaxAlphaBeta(game, validMoves, -WIN, WIN);
    findMoveMiniMaxAlphaBeta(game, validMoves, -WIN, WIN);
    depth = 0;
    counter = 0;
    console.log(`Next move: ${nextMove}`);
    return nextMove;

}

export function getValidMoves(game) {
    let validMoves = [];
    game.board.forEach((space, i) => {
        if (space == '-') {
            validMoves.push(i);
        }
    });
    return validMoves;
}

function findMoveNegaMaxAlphaBeta(game, validMoves, alpha, beta) {

    counter++;
    if (game.checkWinner(game.playerMarker)) {
        return WIN;
    } else if (game.checkWinner(game.computerMarker)) {
        return -WIN;
    } else if (game.checkTie()) {
        return 0;
    }

    let maxScore = -WIN;
    for (let i = 0; i < validMoves.length; i++) {
        game.makeMove(validMoves[i]);

        console.log(`Move made board: ${game.board}`);
        displayArray(game.boardLog)

        depth++;

        console.log(`Current depth: ${depth}`);

        let nextMoves = getValidMoves(game);


        let score = -findMoveNegaMaxAlphaBeta(game, nextMoves, -beta, -alpha);
        console.log('V-------------------------------V');
        console.log('Branch completed! Returning...')
        console.log(score);
        console.log(`Current depth: ${depth}`);
        console.log('A-------------------------------A');

        if (score > maxScore) {
            maxScore = score;
            console.log('hehe');
            console.log(`Current max Score: ${maxScore} `)
            
            if (depth == 1) {
                console.log('hoho');
                nextMove = validMoves[i];

                console.log(`Current Best Move: ${validMoves[i]} -> ${score}`);
            }
        }
        
        console.log('V-------------------------------V');
        displayArray(game.boardLog);
        console.log('undoing..');

        game.undoMove();
        
        console.log(`Undo complete: ${game.board}`);
        displayArray(game.boardLog);
        console.log('A-------------------------------A');
        
        depth--;

        // if (maxScore > alpha) {
        //     alpha = maxScore;
        // }
        // if (alpha >= beta) {
        //     break;
        // }
    }
    return maxScore;
}

function findMoveMiniMaxAlphaBeta (game, validMoves, alpha, beta) {
    if (game.checkWinner(game.playerMarker)) {
        return WIN;
    } else if (game.checkWinner(game.computerMarker)) {
        return -WIN;
    } else if (game.checkTie()) {
        return 0;
    }

    if (game.computerToMove) {
        let maxScore = -WIN;
        for (let i = 0; i < validMoves.length; i++) {
            game.makeMove(validMoves[i]);

            console.log(`Move made board: ${game.board}`);
    
            depth++;
    
            console.log(`Current depth: ${depth}`);
            let nextMoves = getValidMoves(game);
            let score = findMoveMiniMaxAlphaBeta(game, nextMoves, alpha, beta);

            console.log('V-------------------------------V');
            console.log('Branch completed! Returning...')
            console.log(score);
            console.log(`Current depth: ${depth}`);
            console.log('A-------------------------------A');

            console.log(`Current max Score: ${maxScore} `);
            if (score > maxScore) {
                maxScore = score;
                console.log(`New max Score: ${maxScore} `);
                if (depth == 1) {
                    console.log(`Current Best Move: ${validMoves[i]} -> ${score}`);
                    nextMove = validMoves[i];
                }
            }

            console.log('V-------------------------------V');
            console.log('undoing..');
    
            game.undoMove();
            
            console.log(`Undo complete: ${game.board}`);
            console.log('A-------------------------------A');

            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
                break;
            }
            depth--;
        }
        return maxScore;
    } else {
        let minScore = WIN;
        for (let i = 0; i < validMoves.length; i++) {
            game.makeMove(validMoves[i]);

            console.log(`Move made board: ${game.board}`);

            depth++;

            console.log(`Current depth: ${depth}`);
            let nextMoves = getValidMoves(game);
            let score = findMoveMiniMaxAlphaBeta(game, nextMoves, alpha, beta);

            console.log('V-------------------------------V');
            console.log('Branch completed! Returning...')
            console.log(score);
            console.log(`Current depth: ${depth}`);
            console.log('A-------------------------------A');

            console.log(`Current min Score: ${minScore} `);
            if (score < minScore) {
                minScore = score;
                console.log(`New min Score: ${minScore} `);
                if (depth == 1) {
                    console.log(`Current Best Move: ${validMoves[i]} -> ${score}`);
                    nextMove = validMoves[i];
                }
            }

            console.log('V-------------------------------V');
            console.log('undoing..');
    
            game.undoMove();
            
            console.log(`Undo complete: ${game.board}`);
            console.log('A-------------------------------A');

            beta = Math.min(beta, score);
            if (beta <= alpha) {
                break;
            }
            depth--;
        }
        return minScore;
    }
}