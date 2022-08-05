const playerRed = 'red';
const playerYellow = 'yellow';

let startingPlayer = playerRed;
let currentPlayer = startingPlayer;

let board = [];
let fillTracker = []

const rows = 6;
const columns = 7;

let selectedColumn = null
const modal = document.getElementById("namesModal");

let scoreRed = 0
let scoreYellow = 0
let gameOver = false;
let draw = false;
let dynamicLighting = false



window.onload = function() {
    setGame();
}

function setGame() {
    board = []
    fillTracker = [5,5,5,5,5,5,5]
    currentPlayer = startingPlayer;
    setBoard();
    setTopRow();
    nextRound();
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
            space.addEventListener('mouseout', resetHighlightColumnEvent);
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
    if (gameOver === true && draw === false){
        (currentPlayer === playerRed) ? scoreRed ++ : scoreYellow ++;
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
    let text = 'Warning! \n \n Turning on dynamic lighting may affect performance!';
    let toggle = document.getElementById('toggle');
    if (dynamicLighting === false){
        if (confirm(text) == true){
        dynamicLighting = true
        toggle.checked = true
         }else{
            dynamicLighting = false;
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

    previousSelectedColum = selectedColumn
    let location = this.id.split('-');
    let c = location[1];
    let r = fillTracker[c];
    selectedColumn = Number(c);

    removeExistingAnimationElement(c);
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
    if (fillTracker[c] >= 0){ 
        topSpace.classList.add(`top-${currentPlayer}`);
        topSpace.classList.add('bob');
    }else{
        topSpace.classList.add(`top-${currentPlayer}-denied`);
    }
}

function addNewAnimationElement(r,c){
    if (document.getElementById('animation-div') === null){
        let animationContainer = document.createElement('div');
        animationContainer.setAttribute('id', 'animation-div');
        let space = document.getElementById(String(r) + '-' + String(c));
        space.appendChild(animationContainer);
    }
}

function resetHighlightColumnEvent(e){

    let location = this.id.split('-');
    let c = Number(location[1]);
    selectedColumn = null


    resetHighlightColumn(c);
}

function resetHighlightColumn(c){

    let topSpace = document.getElementById('top-' + c)
    topSpace.classList.remove('bob');
    topSpace.classList.remove('top-red');
    topSpace.classList.remove('top-yellow');
    topSpace.classList.remove('top-red-denied');
    topSpace.classList.remove('top-yellow-denied');

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
    resetTopRow(c);
    updateFillTracker(r,c);
    checkForDraw();
    updateScore();
    alternatePlayer();
    nextRound();
    
}

function checkForDraw(){
    for (i = 0; i < columns; i++){
        if(fillTracker[i] !== -1){
            return;
        }
    }
    gameOver = true;
    draw = true;
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
    let redarrow = document.getElementById('redturn')
    let yellowarrow = document.getElementById('yellowturn')
    yellowarrow.classList.remove('show')
    yellowarrow.classList.remove('hide')
    redarrow.classList.remove('show')
    redarrow.classList.remove('hide')
    if (gameOver){
       if (startingPlayer === playerRed) {
        startingPlayer = playerYellow;
        yellowarrow.classList.add('show');
        redarrow.classList.add('hide');
    }else{
        startingPlayer = playerRed;
        yellowarrow.classList.add('hide');
        redarrow.classList.add('show');
    }
         
    }else{
        if(currentPlayer === playerRed) {
            currentPlayer = playerYellow; 
            yellowarrow.classList.add('show');
            redarrow.classList.add('hide'); 
        }else{
            currentPlayer = playerRed;
            yellowarrow.classList.add('hide');
            redarrow.classList.add('show');
        }
    }
}

function resetTopRow(c){
    let topSpace = document.getElementById('top-' + c);
    topSpace.classList.remove(`top-${currentPlayer}`);
    topSpace.classList.remove('bob');
}

function updateFillTracker(r,c){
    r --;
    fillTracker[c] = r;
}

function nextRound(){
    let newRoundBtn = document.getElementById('newround')
    if (gameOver){
        newRoundBtn.setAttribute('class', 'show');
     }else{
        newRoundBtn.setAttribute('class', 'hide');
     }
}

function resetRound(){
    gameOver = false;
    draw = false;
    clearSpaces();
    clearTopSpaces();
    setGame();
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
    resetNames();
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
    gameOver = false;
    draw = false;
    startingPlayer = playerRed;
    let redarrow = document.getElementById('redturn')
    let yellowarrow = document.getElementById('yellowturn')
    yellowarrow.classList.remove('show')
    yellowarrow.classList.remove('hide')
    redarrow.classList.remove('show')
    redarrow.classList.remove('hide')
    redarrow.classList.add('show');
    yellowarrow.classList.add('hide');
}

function editNames(){
    namesModal.style.display = "block";
}

window.onclick = function(event){
    if (event.target == namesModal) {
        closeNames();
      }
}

function closeNames(){
    updateNames();
    namesModal.style.display = "none";
}

function updateNames(){
    let red = document.getElementById('redScoreName');
    let yellow = document.getElementById('yellowScoreName');
    let newRed = document.getElementsByName('redName')[0];
    let newYellow = document.getElementsByName('yellowName')[0];
    red.innerText = newRed.value;
    yellow.innerText = newYellow.value;
}

function resetNames(){
    let red = document.getElementById('redScoreName');
    let yellow = document.getElementById('yellowScoreName');
    red.innerText = 'Red'
    yellow.innerText = 'Yellow'
}

function showMenu(){
    // let hamburger = document.getElementById('hamburgertoggle')
    // let items = document.getElementById('navlinks')
    // if (hamburger.checked === true){
    //     window.alert('hide')
    //     items.classList.remove('hidemenu')
    // }else{
    //     window.alert('show')
    //     items.classList.add('hidemenu')
    // }
    window.alert('hello')
}


//KEYBOARD FUNCTONALITY - BUGGY WHEN WORKING WITH MOUSEMOVE AND MOUSEOUT EVENTS

// document.addEventListener('keydown', (event) => {
//         let keyName = event.key;
//         keyboardFunc(keyName)
//     }
// )

// function keyboardFunc(keyName){

//     previousSelectedColum = selectedColumn

//     // window.alert(String(selectedColumn));

//     if (keyName === 'ArrowRight'){
//         if (selectedColumn === null){
//             selectedColumn = 0
//          }else if (selectedColumn >=0 && selectedColumn <6){
//             selectedColumn += 1
//          }else{
//             return
//          }
//     };
//     if (keyName === 'ArrowLeft'){
//         if (selectedColumn === null){
//             selectedColumn = 6
//          }else if (selectedColumn >0 && selectedColumn <=6){
//             selectedColumn -= 1
//          }else{
//             return
//          }
//     };

//     for (i = 0; i < columns; i++){
//         if (i !== selectedColumn){
        
//         }
//     }

//     let r = fillTracker[selectedColumn];
//     if (previousSelectedColum !== null){
//         resetHighlightColumn(previousSelectedColum);    
//     }
//     removeExistingAnimationElement();
//     updateTopPiece(selectedColumn);
//     addNewAnimationElement(r,selectedColumn);
// }