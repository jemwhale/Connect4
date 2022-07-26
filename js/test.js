let board = [
    ['Y','R','Y','R','Y','R','Y'],
    ['R','Y','R','Y','R','Y','R'],
    ['R','R','Y','R','Y','R','Y'],
    ['R','Y','R','Y','R','Y','R'],
    ['Y','R','Y','R','Y','R','Y'],
    ['R','Y','R','Y','R','Y','R']
]
const rows = 6;
const columns = 7;
currentPlayer = 'Y'

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

    for (i = -2; i < 4; i ++){
        r = getDiagRight(i).join('');
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




function getColumn(column){
    let colArr = []
    for (let j = 0; j < rows; j ++){
    colArr.push(board[j][column])
    }
    return colArr
}





function getDiagRight(diagRight){
    
    let diag1Arr = []
    if (diagRight < 0){
        let newRow = diagRight * -1
        for (let col = 0; col + newRow < 6; col ++){
            diag1Arr.push(board[col + newRow][col])
        } 
    }else if(diagRight > 0){
        for (let row = 0; row + diagRight < 7; row ++){
            diag1Arr.push(board[row][row + diagRight])
            }
    }else{
        for (let row = 0; row + diagRight < 6; row ++){
            diag1Arr.push(board[row][row + diagRight])
            }
    }
    return diag1Arr
}

// connect4();
console.log(getDiagRight(1))

