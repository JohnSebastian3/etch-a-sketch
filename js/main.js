let gridContainer = document.querySelector('.grid-container');
const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', eraseBoard);

for(let i = 0; i < 256; i++) {
  let square = document.createElement('div');
  square.classList.add('square');
  square.style.border = '1px solid black';
  gridContainer.appendChild(square);
}

const squares = document.querySelectorAll('.square');

for(let square of squares) {
  square.addEventListener('mouseenter', filled);
}

function filled(e) {
  e.target.classList.add('filled');
}

function eraseBoard(e) {
  for(let square of squares) {
    square.classList.remove('filled');
  }
}
