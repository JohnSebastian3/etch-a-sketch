let gridContainer = document.querySelector('.grid-container');
const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', eraseBoard);

function createGrid(sideLength) {
  removeAllChildNodes(gridContainer);

  gridContainer.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
  gridContainer.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;

  const totalSquares = sideLength ** 2;
  for(let i = 0; i < totalSquares; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.border = '1px solid black';
    gridContainer.appendChild(square);
  }

  const squares = document.querySelectorAll('.square');
  console.log(squares);

  for(let square of squares) {
    square.addEventListener('mouseenter', filled);
  }

}

function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

createGrid(16)

// const squares = document.querySelectorAll('.square');

// for(let square of squares) {
//   square.addEventListener('mouseenter', filled);
// }

function filled(e) {
  e.target.classList.add('filled');
}



function eraseBoard(e) {
  console.log(e);
  const squares = document.querySelectorAll('.square');
  for(let square of squares) {
    square.classList.remove('filled');
  }

  let sideLength;

  do {
    sideLength = +prompt('Enter number of squares per side to generate new grid: ');
  } while(sideLength > 100 || sideLength < 0);

  createGrid(sideLength);

}
