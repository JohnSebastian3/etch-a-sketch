let gridContainer = document.querySelector('.grid-container');
const newGridButton = document.querySelector('.new-grid');
const clearButton = document.querySelector('.clear');
const classicButton = document.querySelector('.classic');
const pencilButton = document.querySelector('.pencil');
const randomButton = document.querySelector('.random');

newGridButton.addEventListener('click', newBoard);
clearButton.addEventListener('click', clearBoard);


let penColor = '';
let colorMode = 'classic';



classicButton.addEventListener('click', e => {
  penColor = 'rgb(160, 160, 160';
  colorMode = 'classic';
  setColor(e, colorMode);
  // filled(e);
})

pencilButton.addEventListener('click', e => {
  penColor = 'rgb(160, 160, 160)';
  colorMode = 'pencil';
  setColor(e, colorMode);
  // filled(e);
})

randomButton.addEventListener('click', e => {
  colorMode = 'random';
  setColor(e, colorMode);
  // filledRandom(e);
})

function createGrid(sideLength) {
  removeAllChildNodes(gridContainer);

  gridContainer.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
  gridContainer.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;
  gridContainer.style.border = `1px solid black`;

  const totalSquares = sideLength ** 2;
  for(let i = 0; i < totalSquares; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.border = '1px solid rgba(0,0,0,0.1)';
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
    // console.log(`rgb(${newVal}, ${newVal}, ${newVal})`)
    e.target.style.background = `rgb(${newVal}, ${newVal}, ${newVal})`;
  }
}

// function filledPencil(e) {
//   initialVal = 200;
//   if(e.target.tagName !== 'BUTTON') {
//     if(initialVal > 0) {
//       e.target.style.background = `rgb(${initialVal}, ${initialVal}, ${initialVal})`;
//       initialVal = initialVal - decrement;
//     }
//   }
// }

function filledRandom(e) {
  if(e.target.tagName !== 'BUTTON') {
    e.target.style.background = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`
  }
}



function newBoard(e) {
  console.log(e);
  const squares = document.querySelectorAll('.square');
  for(let square of squares) {
    square.classList.remove('filled');
  }

  let sideLength;

  do {
    sideLength = +prompt('Enter number of squares per side (between 0 - 100) to generate new grid: ');
  } while(sideLength > 100 || sideLength < 0);

  createGrid(sideLength);

}

function clearBoard() {
  const squares = document.querySelectorAll('.square');
    // for(let square of squares) {
    //   square.classList.remove('filled');
    // }
    
    createGrid(Math.sqrt(squares.length));
}



function randomRGB() {
  return Math.floor(Math.random() * 257);
}
