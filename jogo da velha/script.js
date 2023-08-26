const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningText = document.querySelector('[data-winning-message-text]');
const winningMensage = document.querySelector('[data-winning-message]');
const btnRestart = document.querySelector('[data-btn-restart]');

let isCircleTurn;
const winningCombinations= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    
];
const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove('circle');
    cell.classList.remove('x');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  }
  
  

  setBoardHandleClass();
  winningMensage.classList.remove("show-winning-message");
};
const endGame = (isDraw) =>{
    if (isDraw){
        winningText.innerText = 'Empate!'
    } else {
        winningText.innerText = isCircleTurn ? 'O Venceu!' : ' X Venceu!';
    }
    winningMensage.classList.add('show-winning-message');
};


const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination =>{
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return[... cellElements].every(cell =>{
        return cell.classList.contains('x')|| cell.classList.contains('circle')
    });
}

const placeMark = (cell, addClass) =>{
    cell.classList.add(addClass);
};

const setBoardHandleClass = () =>{
    board.classList.remove('circle')
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

const swapTurns = ()=> {
    isCircleTurn = !isCircleTurn;
    setBoardHandleClass();
    
};
const handleClick = (e) => {
  // colocar X ou O
  const cell = e.target;
  const addClass = isCircleTurn ? 'circle' : 'x';

  placeMark(cell, addClass);
  
  // Verificar Vitória

    const isWin = checkForWin(addClass);
    
    //Verificar empate

    const isDraw = checkForDraw();
    if(isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true);
    } else {
        swapTurns();
    }
    
  // Mudar jogador
 
};

startGame();

btnRestart.addEventListener('click', startGame);

