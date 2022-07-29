const playerRed = 'red';
const playerYellow = 'yellow';

let currentPlayer = playerRed;
let redToStart = true

let board = [];
let fillTracker = []

const rows = 6;
const columns = 7;

let scoreRed = 0
let scoreYellow = 0
let gameOver = false;
let dynamicLighting = false

window.onload = function() {
    setGame();
}

function setGame() {
    board = []
    fillTracker = [5,5,5,5,5,5,5]
    setBoard();
    setTopRow();
    setLighting();
    updateScore();
}

function setBoard(){
    for (let r = 0; r < rows; r++){
        let row = []
        for (let c = 0; c < columns; c++){
            row.push(' ');
            let space = document.createElement('div');
            space.setAttribute('id', r + '-' + c);
            space.setAttribute('class', 'space');
            space.addEventListener('click', move);
            space.addEventListener('mousemove', highlightColumn);
            space.addEventListener('mouseout', resetHighlightColumn);
            document.getElementById('board').appendChild(space);
        }
        board.push(row);
    }
}

function setTopRow(){
    for (c = 0; c < columns; c++){
        let space = document.createElement('div');
        space.setAttribute('id', 'top-' + c);
        space.classList.add('top-space');
        space.classList.add('bob');
        document.getElementById('board-top').appendChild(space);
    }
}

function updateScore(){
    setWinner();
    let score = `${scoreRed}-${scoreYellow}`
    let scorePlaceholder = document.getElementById('score');
    scorePlaceholder.innerText = String(score);
}

function setWinner(){
    if (gameOver === true){
        if(currentPlayer === playerRed){
            scoreRed ++;
        }else{
            scoreYellow ++;
        }
    }
}

function setLighting(){
    lightSpaces();
    lightBoard();
    connect4();
}

function lightSpaces(){
    for (r = 0; r < rows; r++){
        for (c = 0; c < columns; c++){
            let space = document.getElementById(String(r) + '-' + String(c))
            if(dynamicLighting === false){
                space.classList.add('staticshadow');
                space.classList.remove('dynamicshadow');
            }else{
                space.classList.add('dynamicshadow');
                space.classList.remove('staticshadow');
            }
        }
    }
}

function lightBoard(){
    let space = document.getElementById('board')
    if(dynamicLighting === false){
        space.classList.add('staticshine');
        space.classList.remove('dynamicshine');
    }else{
        space.classList.add('dynamicshine');
        space.classList.remove('staticshine');
    }
}

function toggleLighting(){
    if (dynamicLighting === false){
        let text = 'Warning! \n \n Turning on dynamic lighting may affect performance!';
        if (confirm(text) == true) {
            dynamicLighting = true;
        } else {
            dynamicLighting = false;
            let toggle = document.getElementById('toggle')
            toggle.checked = false
        } 
    }else{
        dynamicLighting = false;
    }
    setLighting();
}

function highlightColumn(e){
    
    if(gameOver){
        return
    }

    let location = this.id.split('-');
    let c = location[1];
    let r = fillTracker[c]
    
    removeExistingAnimationElement();
    updateTopPiece(c);
    addNewAnimationElement(r,c);
}

function removeExistingAnimationElement(){
    let animatePiece = document.getElementById('animation-div')

    if (animatePiece !== null){
    animatePiece.remove();
    }
}

function updateTopPiece(c){
    let topSpace = document.getElementById('top-' + c)
    topSpace.classList.add(`top-${currentPlayer}`);
}

function addNewAnimationElement(r,c){
    if (document.getElementById('animation-div') === null){
        let animationContainer = document.createElement('div');
        animationContainer.setAttribute('id', 'animation-div');
        let space = document.getElementById(String(r) + '-' + String(c));
        space.appendChild(animationContainer);
    }
}

function resetHighlightColumn(e){

    let location = this.id.split('-');
    let c = Number(location[1]);

    let topSpace = document.getElementById('top-' + c)
    topSpace.classList.remove('top-red');
    topSpace.classList.remove('top-yellow');

    let deleteDiv = document.getElementById('animation-div');
    deleteDiv.remove();
}

function move(e){

    if(gameOver){
        return;
    }

    let location = this.id.split('-');
    let c = Number(location[1]);
    let r = fillTracker[c]

    if(r < 0){
        return;
    }

    dropAnimation();
    assignSpace(r,c);

    if(connect4()){
        gameOver = true
    }

    updateScore();
    resetTopRow(c);
    alternatePlayer();
    updateFillTracker(r,c);
}

function assignSpace(r,c){
    board[r][c] = currentPlayer;
    let filledSpace = document.getElementById(String(r) + '-' + String(c));
    filledSpace.classList.add(`${currentPlayer}-piece`);
}

function dropAnimation(){
    let animatePiece = document.getElementById('animation-div');
    animatePiece.classList.add('drop');
    animatePiece.classList.add(`${currentPlayer}-piece`);
}

function alternatePlayer(){
    if (currentPlayer === playerRed){
        currentPlayer = playerYellow;
    }else{
        currentPlayer = playerRed;
    }
}

function resetTopRow(c){
    let topSpace = document.getElementById('top-' + c);
    topSpace.classList.remove(`top-${currentPlayer}`);
}

function updateFillTracker(r,c){
    r --;
    fillTracker[c] = r;
}

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

function getRow(){
    for (let r = 0; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r)+'-'+String(c + j));
                        highlightWin(winningSpace);
                    }
                    return true
                }
            }
        }
    }
    return false
}

function getColumn(){
    for (let c = 0; c < columns; c++){
        for(let r = 0; r < rows - 3; r++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r + j)+'-'+String(c));
                        highlightWin(winningSpace);
                    }
                    return true
                }
            }
        }
    }
    return false
}

function getDiagDown(){
    for (let r = 0; r < rows - 3; r++){
        for(let c = 0; c < columns - 3; c++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r + j)+'-'+String(c + j));
                        highlightWin(winningSpace);
                    }
                    return true
                }
            }
        }
    }
    return false
}

function getDiagUp(){
    for (let r = 3; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if (board[r][c] !== ' '){
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3] ){
                    for(let j = 0; j < 4; j++){
                        let winningSpace = document.getElementById(String(r - j)+'-'+String(c + j));
                        highlightWin(winningSpace);
                    }
                    return true
                }
            }
        }
    }
    return false
}

function highlightWin(winningSpace){
    winningSpace.classList.remove('dynamicshadow');
    winningSpace.classList.remove('staticshadow');
    winningSpace.classList.add('winning-piece');
}

function resetGame(){
    clearSpaces();
    clearTopSpaces();
    clearScore();
    resetPlayers(); 
    setGame();
}

function clearSpaces(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let removedSpace = document.getElementById(String(r) + '-' + String(c));
            removedSpace.remove();
        }
    }
}

function clearTopSpaces(){
    for (c = 0; c < columns; c++){
        let removedSpace = document.getElementById('top-' + String(c));
        removedSpace.remove();
    }
}

function clearScore(){
    scoreRed = 0
    scoreYellow = 0
}

function resetPlayers(){
    gameOver = false
    redToStart = true
}


// if (redToStart){
//     currentPlayer = playerYellow
//     redToStart= false
// }else{
//     redToStart = true
//     currentPlayer = playerRed
// }