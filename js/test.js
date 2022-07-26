let board = [
    ['Y','R','Y','R','Y','R','Y'],
    ['R','Y','R','Y','R','Y','R'],
    ['Y','R','Y','R','Y','R','Y'],
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

    return false
}

connect4();

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





function getDiagRight(){
    let diag1Arr = []
    
    return diag1Arr
}