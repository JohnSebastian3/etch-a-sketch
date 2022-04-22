let gridContainer = document.querySelector('.grid-container');
const newGridButton = document.querySelector('.new-grid');
const clearButton = document.querySelector('.clear');
const classicButton = document.querySelector('.classic');
const pencilButton = document.querySelector('.pencil');
const randomButton = document.querySelector('.random');
const gridLines = document.querySelector('.grid-lines');

let penColor = '';
let colorMode = 'classic';


newGridButton.addEventListener('click', e => {
  deactivateButtons();
  newBoard();
});

clearButton.addEventListener('click', e => {
  clearBoard();
});

gridLines.addEventListener('click', toggleGridLines);

classicButton.addEventListener('click', e => {
  deactivateButtons();
  e.target.classList.toggle('active');
  penColor = 'rgb(160, 160, 160';
  colorMode = 'classic';
  setColor(e, colorMode);
})

pencilButton.addEventListener('click', e => {
  deactivateButtons();
  e.target.classList.toggle('active');
  penColor = 'rgb(160, 160, 160)';
  colorMode = 'pencil';
  setColor(e, colorMode);
})

randomButton.addEventListener('click', e => {
  deactivateButtons();
  e.target.classList.toggle('active');
  colorMode = 'random';
  setColor(e, colorMode);
})

function createGrid(sideLength) {
  removeAllChildNodes(gridContainer);

  gridContainer.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
  gridContainer.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;


  const totalSquares = sideLength ** 2;
  for(let i = 0; i < totalSquares; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.classList.add('grid-line');
    square.style.background = 'rgb(255,255,255)';
    gridContainer.appendChild(square);
  }

  
}
createGrid(16)

function setColor(e, colorMode) {
  const squares = document.querySelectorAll('.square');
  if(colorMode === 'classic') {
    for(let square of squares) {
      square.addEventListener('mouseenter', e => {
        filled(e);
      })
    } 
  } else if(colorMode === 'pencil') {
    for(let square of squares) {
      let currentColor = 160;
      square.addEventListener('mouseenter', e => {
        
          filledPencil(e, currentColor);
          makeDarker(e, currentColor);
          if(currentColor > 20) {
            currentColor -= 20;
          }
        
      })
    }
  } else if(colorMode === 'random') {
    for(let square of squares) {
      square.addEventListener('mouseenter', e => {
        filledRandom(e);
      })
    }
  }
}


function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}




function filled(e) {
  if(e.target.tagName !== 'BUTTON') {
    e.target.style.background = `${penColor}`;
  }
}

function filledPencil(e, currentColor) {
  if(e.target.tagName !== 'BUTTON') {
    e.target.style.background = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
  }
}

function makeDarker(e, currentColor) {
  if(e.target.tagName !== 'BUTTON') {
    let newVal = currentColor - 20;
    e.target.style.background = `rgb(${newVal}, ${newVal}, ${newVal})`;
  }
}


function filledRandom(e) {
  if(e.target.tagName !== 'BUTTON') {
    e.target.style.background = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`
  }
}



function newBoard(e) {
  let sideLength;

  do {
    sideLength = +prompt('Enter number of squares per side (between 0 - 100) to generate new grid: ');
  } while(sideLength > 100 || sideLength < 0);

  createGrid(sideLength);

}

function clearBoard() {
  const squares = document.querySelectorAll('.square');
    for(let square of squares) {
      square.style.background = 'rgb(255, 255, 255)';
    }
    
}



function randomRGB() {
  return Math.floor(Math.random() * 257);
}

function toggleGridLines() {
  const squares = document.querySelectorAll('.square');
  for(let square of squares) {
    square.classList.toggle('grid-line');
  }
}

function deactivateButtons() {
  const buttons = document.querySelectorAll('.button');
  for(let button of buttons) {
    button.classList.remove('active');
  } 
}
