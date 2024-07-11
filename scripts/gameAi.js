const WIN = 1;
var nextMove;
var counter = 0;
const DEPTH = 8;

export function displayArray(arr) {
    console.log(`Current Arr:`)
        arr.forEach(elem => {
            console.log(`${elem}`);
        });
}


export function findBestMove(game) {
    nextMove = null;
    counter = 0;
    let validMoves = getValidMoves(game);
    console.log(`Starting board: ${game.board}`);
    findMoveNegaMaxAlphaBeta(game, validMoves, DEPTH, -WIN, WIN, 1);
    console.log(counter);
    return nextMove;
}

function getValidMoves(game) {
    let validMoves = [];
    game.board.forEach((space, i) => {
        if (space === ' ') {
            validMoves.push(i);
        }
    });
    return validMoves;
}

function findMoveNegaMaxAlphaBeta(game, validMoves, depth, alpha, beta, turnMultiplier) {

    counter++;
    if (depth === 0 || game.gameOver()) {
        return turnMultiplier * scoreBoard(game);
    }

    let maxScore = -WIN;
    for (let i = 0; i < validMoves.length; i++) {
        game.makeMove(validMoves[i]);

        let nextMoves = getValidMoves(game);

        let score = -findMoveNegaMaxAlphaBeta(game, nextMoves, depth - 1, -beta, -alpha, -turnMultiplier);

        if (score > maxScore) {
            maxScore = score;
            
            if (depth === DEPTH) {
                nextMove = validMoves[i];
                console.log(`Current Best Move: ${validMoves[i]} -> ${score}`);
            }
        }
        
        game.undoMove();

        if (maxScore > alpha) {
            alpha = maxScore;
        }
        if (alpha >= beta) {
            break;
        }
    }
    return maxScore;
}

function scoreBoard (game) {
    if (game.gameOver()) {
        if (game.checkWinner(game.playerOneMarker)) {
            return -WIN;
        } else if (game.checkWinner(game.playerTwoMarker)) {
            return WIN;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}