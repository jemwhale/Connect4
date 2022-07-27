// Setting global variables


let test = document.getElementById('title');

//Give the players string values to record in the board array
const playerRed = 'R';
const playerYellow = 'Y';

//Assign the current (starting) player
let currentPlayer = playerRed;

//Create empty arrays to keep track of the board and how many rows have been filled in each column
let board = [];
let fillTracker = []

//Set a game over boolean to record when the game has finished
let gameOver = false;

// Set the number of rows and columns on the board
const rows = 6;
const columns = 7;

//---------------------------------------------------------------------------------------------------------------------------
//Calling a function to create/reset the board upon load
window.onload = function() {
    setGame();
}

//---------------------------------------------------------------------------------------------------------------------------
//Function which creates/resets the board

function setGame() {

    //Make sure the board starts empty and the fill tracker is set to the last row of each column
    board = []
    fillTracker = [5,5,5,5,5,5,5]

    //Loop thorugh the rows and create an empty array for each row
    for (let r = 0; r < rows; r++){
        let row = []

        //Loop through the columns and create a new array element for each column in the row array
        for (let c = 0; c < columns; c++){
            row.push(' ');

            //Create a new HTML element for each space on the board and assign it an id that matches the current row and column index
            let space = document.createElement('div');
            space.setAttribute('id', r + '-' + c);
            space.setAttribute('class', 'space');
            space.addEventListener('click', assignSpace)
            space.addEventListener('mousemove', highlightColumn)
            space.addEventListener('mouseout', resetHighlightColumn)
            document.getElementById('board').appendChild(space);

            if (r === 0){
                let space = document.createElement('div');
                space.setAttribute('id', 'top-' + c);
                space.classList.add('top-space');
                space.classList.add('bob');
                document.getElementById('board-top').appendChild(space);
            }
        }

        //Add the new row to the board array
        board.push(row);
    }
}

//---------------------------------------------------------------------------------------------------------------------------
//Function which highlights which column the player is about to drop into
function highlightColumn(e){
    if(gameOver){
        return
    }
    //Take the id of the clicked element, split it into grid numbers and add to an array
    let location = this.id.split('-');
        //Column is the second index of location array
    let c = Number(location[1]);
    let topSpace = document.getElementById('top-' + c)

    topSpace.classList.remove('top-red');
    topSpace.classList.remove('top-yellow');

    if(currentPlayer === playerRed){
        topSpace.classList.add('top-red');
    }else{
        topSpace.classList.add('top-yellow');
    }
}



function resetHighlightColumn(e){
        //Take the id of the clicked element, split it into grid numbers and add to an array
        let location = this.id.split('-');
        //Column is the second index of location array
    let c = Number(location[1]);

    // window.alert(c);
    let topSpace = document.getElementById('top-' + c)
        topSpace.classList.remove('top-red');
        topSpace.classList.remove('top-yellow');
}











//---------------------------------------------------------------------------------------------------------------------------
//Function which assigns a clicked space to the current player then alternates the player

function assignSpace(e){

    //If the game is already over then do nothing
    if(gameOver){
        return;
    }

    //Take the id of the clicked element, split it into grid numbers and add to an array
    let location = this.id.split('-');
    //Column is the second index of location array
    let c = Number(location[1]);
    //Row is the same as the value from the fill tracker array (lowest unfilled space)
    let r = fillTracker[c]

    //If row is below 0 then do nothing as the column is filled
    if(r < 0){
        return;
    }

    //Add the current player's location into the corresponding index of the board array 
    board[r][c] = currentPlayer;

    //Get the corresponding HTML element with the id that matches the current player's location
    let filledSpace = document.getElementById(String(r) + '-' + String(c));
    // window.alert(String(r)+String(c));

    // Fill the current location with the same colour as the cuurent player then assign the next player as the current player
    if (currentPlayer === playerRed){
        filledSpace.classList.add('red-piece');
        if(connect4()){
            test.innerText = 'someone wins'
            gameOver = true
        }
        currentPlayer = playerYellow;
    }else{
        filledSpace.classList.add('yellow-piece');
        if(connect4()){
            test.innerText = 'someone wins'
            gameOver = true
        }
        currentPlayer = playerRed;
    }

    for(i = 0; i < columns; i++){
        let topSpace = document.getElementById('top-' + c)
        topSpace.classList.remove('top-red');
        topSpace.classList.remove('top-yellow');
    }
    
    //Decrement the row index of the current column in the fillTracker array
    r --;
    fillTracker[c] = r;
}

//---------------------------------------------------------------------------------------------------------------------------
function connect4(){
    if(getRow()){
        return true
    }
    if(getColumn()){
        return true
    }
    if(getDiagDown()){
        return true
    }
    if(getDiagUp()){
        return true
    }
    return false
}

//---------------------------------------------------------------------------------------------------------------------------
function getRow(){
    for (let r = 0; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r)+'-'+String(c + j))
                        winningSpace.classList.add('winning-piece')
                    }
                    return true
                }
            }
        }
    }
    return false
}

//---------------------------------------------------------------------------------------------------------------------------
function getColumn(){
    for (let c = 0; c < columns; c++){
        for(let r = 0; r < rows - 3; r++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r + j)+'-'+String(c))
                        winningSpace.classList.add('winning-piece')
                    }
                    return true
                }
            }
        }
    }
    return false
}

//---------------------------------------------------------------------------------------------------------------------------
function getDiagDown(){
    for (let r = 0; r < rows - 3; r++){
        for(let c = 0; c < columns - 3; c++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r + j)+'-'+String(c + j))
                        winningSpace.classList.add('winning-piece')
                    }
                    return true
                }
            }
        }
    }
    return false
}

//---------------------------------------------------------------------------------------------------------------------------
function getDiagUp(){
    for (let r = 3; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r - j)+'-'+String(c + j))
                        winningSpace.classList.add('winning-piece')
                    }
                    return true
                }
            }
        }
    }
    return false
}


















//---------------------------------------------------------------------------------------------------------------------------
// function connect4(){
//     let r = ''
//     let check = ''
//     check = String(currentPlayer) + String(currentPlayer) + String(currentPlayer) + String(currentPlayer)
    
//     for (let i = 0; i < rows; i ++){
//         r = getRow(i).join('');
//         if(r.includes(check)){
//             return true
//         }
//     }

//     for (i = 0; i < columns; i ++){
//         r = getColumn(i).join('');
//         if(r.includes(check)){
//             return true
//         }
//     }

//     for (i = -2; i < 4; i ++){
//         r = getDiagRight(i).join('');
//         if(r.includes(check)){
//             return true
//         }
//     }

//     return false
// }

//---------------------------------------------------------------------------------------------------------------------------
// function getRow(row){
//     let rowArr = []
//     for (let j = 0; j < columns; j ++){
//     rowArr.push(board[row][j])
//     }
//     return rowArr
// }

//---------------------------------------------------------------------------------------------------------------------------
// function getColumn(column){
//     let colArr = []
//     for (let j = 0; j < rows; j ++){
//     colArr.push(board[j][column])
//     }
//     return colArr
// }

//---------------------------------------------------------------------------------------------------------------------------
// function getDiagRight(diagRight){
    
//     let diag1Arr = []
//     if (diagRight < 0){
//         let newRow = diagRight * -1
//         for (let col = 0; col + newRow < 6; col ++){
//             diag1Arr.push(board[col + newRow][col])
//         } 
//     }else if(diagRight > 0){
//         for (let row = 0; row + diagRight < 7; row ++){
//             diag1Arr.push(board[row][row + diagRight])
//             }
//     }else{
//         for (let row = 0; row + diagRight < 6; row ++){
//             diag1Arr.push(board[row][row + diagRight])
//             }
//     }
//     return diag1Arr
// }

//---------------------------------------------------------------------------------------------------------------------------
// function leftDiagChecker(){

// }
