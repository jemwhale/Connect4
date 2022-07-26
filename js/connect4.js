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
            space.setAttribute
            ('class', 'space');
            space.addEventListener('click', assignSpace)
            document.getElementById('board').appendChild(space);
        }

        //Add the new row to the board array
        board.push(row);
    }
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
        filledSpace.setAttribute('class', 'space red-piece');
        if(connect4()){
            test.innerText = 'someone wins'
            gameOver = true
        }
        currentPlayer = playerYellow;
    }else{
        filledSpace.setAttribute('class', 'space yellow-piece');
        if(connect4()){
            test.innerText = 'someone wins'
            gameOver = true
        }
        currentPlayer = playerRed;
    }

    //Decrement the row index of the current column in the fillTracker array
    r --;
    fillTracker[c] = r;
}

//---------------------------------------------------------------------------------------------------------------------------
function connect4(){
    let r = ''
    let check = ''
    check = String(currentPlayer) + String(currentPlayer) + String(currentPlayer) + String(currentPlayer)
    
    for (let i = 0; i < rows; i ++){
        r = getRow(i).join('');
        if(r.includes(check)){
            return true
        }
    }

    for (i = 0; i < columns; i ++){
        r = getColumn(i).join('');
        if(r.includes(check)){
            return true
        }
    }

    return false
}

//---------------------------------------------------------------------------------------------------------------------------
function getRow(row){
    let rowArr = []
    for (let j = 0; j < columns; j ++){
    rowArr.push(board[row][j])
    }
    return rowArr
}

//---------------------------------------------------------------------------------------------------------------------------
function getColumn(column){
    let colArr = []
    for (let j = 0; j < rows; j ++){
    colArr.push(board[j][column])
    }
    return colArr
}

//---------------------------------------------------------------------------------------------------------------------------
function rightDiagChecker(){

}

//---------------------------------------------------------------------------------------------------------------------------
function leftDiagChecker(){

}
