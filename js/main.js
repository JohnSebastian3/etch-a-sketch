let gridContainer = document.querySelector('.grid-container');
const clearButton = document.querySelector('.clear');
const classicButton = document.querySelector('.classic');
const pencilButton = document.querySelector('.pencil');
const randomButton = document.querySelector('.random');

clearButton.addEventListener('click', eraseBoard);

let penColor = 'gray';


classicButton.addEventListener('click', e => {
  penColor = 'gray';
  filled(e);
})

pencilButton.addEventListener('click', e => {
  penColor = '#020202';
  filled(e);
})

randomButton.addEventListener('click', e => {
  
  penColor = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`
  filled(e);
})

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
    square.addEventListener('mouseenter', e => {
      filled(e);
    });
  }

}

function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

createGrid(16)



function filled(e) {
  if(e.target.tagName !== 'BUTTON') {
    e.target.style.background = `${penColor}`;
  }
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

function randomRGB() {
  return Math.floor(Math.random() * 257);
}
