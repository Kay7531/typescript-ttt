/*-------------------------------- Constants --------------------------------*/
////Step 5 - Define the required constants
//a) In a constant called `winningCombos` define the eight possible winning combinations as an array of arrays.
const winningCombos: Array<number[]>= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// const spIdx = []


/*---------------------------- Variables (state) ----------------------------*/
//Step 1 - Define the required variables used to track the state of the game
let turn: number, winner: boolean, tie: boolean, board: number[]

//console.log(board)
 


/*------------------------ Cached Element References ------------------------*/
//Step 2 - Store cached element references 
const squareEls = document.querySelectorAll <HTMLElement>(".sqr")
const messageEl = document.getElementById("message")!
const resetBtnEl=document.getElementById("reset")!
 console.log(winningCombos)
 /*----------------------------- Event Listeners -----------------------------*/
window?.addEventListener("load", init)
squareEls.forEach(function (sqrEl): void{
    sqrEl?.addEventListener("click", handleClick)
}) 
resetBtnEl?.addEventListener("click", init)
/*-------------------------------- Functions --------------------------------*/
//Step 3 - Upon loading, the game state should be initialized, and a function should be called to render this game state

function init(event:MouseEvent):void{
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    turn = 1
    winner = false
    tie = false
    
    render()
}
// Step 4 - The state of the game should be rendered to the user
function render():void{
    updateBoard()
    updateMessage()
}

function updateBoard():void{
     board.forEach(function(element,idx){
       let sqrValue= element
       if (element === null){ 
        squareEls[idx].textContent = ''
       } else if( element === 1 ){
        squareEls[idx].textContent = 'X'
       } else if (element === -1){
        squareEls[idx].textContent= 'O'
       }
    })
}

function updateMessage(){
    if ((winner === false) && (tie === false) && (turn === -1)){
        messageEl.textContent =  "Player 1 it's your turn."
     } else if ((winner === false) && (tie === false) && (turn === 1)){
        messageEl.textContent = "Player 2 it's your turn."
    } else if ((winner === false) && (tie === true)){
        messageEl.textContent ="It's a tie."
     } else if ((winner === true) && (turn === -1)) {
        messageEl.textContent= "Player 1 WINS"
     } else if ((winner === true) && (turn === 1)) {
        messageEl.textContent= "Player 2 WINS"
     } else {
        messageEl.textContent = ""
     }
}

//Step 6 - Handle a player clicking a square with a `handleClick` function

function handleClick(evt: MouseEvent):void {
const sqIdx = +evt.target!.('id'in evt.target!).slice(2)
console.log(sqIdx)
if (board[sqIdx] !== null){
    return
} else if (winner === true){
    return
}
placePiece(sqIdx)
checkForTie()
checkForWinner()
switchPlayerTurn()
render()
}
//6.1 - placePiece
function placePiece(sqIdx){
return (board[sqIdx] = turn)
}
// turn = -1
// console.log(placePiece(1))

// 6.2 - `checkForTie`

function checkForTie(){
    const hasNull = board.some(function(element){
        return element === null
    })
    //console.log(hasNull)
    if (hasNull === true) {
      return tie = false
    } else{
      return tie = true
    }
}
//6.3 - checkForWinner
function checkForWinner(){
    winningCombos.forEach(function(winArr){
        if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]])=== 3){
            winner = true
        }

    })
}
//6.4 - switchPlayerTurn
function switchPlayerTurn(){
    if (winner === true){
        return
    } else {
      return turn *= -1
    }
}

//Confetti function
function Confetti(){
    let duration = 1 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    let interval = setInterval(function() {
      let timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      let particleCount = 50 * (timeLeft / duration);
//       // since particles fall down, start a bit higher than random
//       confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
//       confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
//     }, 250);   
// }