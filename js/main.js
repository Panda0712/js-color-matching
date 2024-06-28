import { randomColorSelection } from './constants.js';

import {
  getColorElementList,
  getTimerElement,
  getPlayAgainButton,
  getColorBackground,
  getUlElement,
} from './selectors.js';

import { generateRandomColor, setTimer, disableHighlightLi, highlightMatchingLi } from './utils.js';

// Global variables
let selections = [];

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function handleLiElementClick(ulElementList, colorBackgroundElement, selections) {
  ulElementList.addEventListener('click', (e) => {
    const liElement = e.target.closest('li');
    if (liElement) {
      liElement.classList.toggle('active');
      const backColor = getComputedStyle(liElement.querySelector('.overlay')).backgroundColor;
      selections.push({ element: liElement, color: backColor });
      if (selections.length === 2) {
        const [firstSelection, secondSelection] = selections;
        const { color: firstColor } = firstSelection;
        const { color: secondColor } = secondSelection;
        const colorElementList = getColorElementList();
        if (firstColor === secondColor) {
          colorBackgroundElement.style.backgroundColor = firstColor;
          highlightMatchingLi(colorElementList, firstColor);
        } else {
          setTimeout(() => {
            disableHighlightLi(firstSelection, secondSelection);
          }, 500);
        }
        selections = [];
      }
    }
  });
}

function handleReplayButton(
  playAgainButton,
  timerElement,
  colorElementList,
  colorBackgroundElement
) {
  playAgainButton.addEventListener('click', () => {
    setTimeout(() => {
      setTimer(timerElement, playAgainButton, colorElementList);
    }, 500);
    playAgainButton.style.display = 'none';
    timerElement.innerText = '';
    colorBackgroundElement.style.backgroundColor = 'goldenrod';
    colorElementList.forEach((colorElement) => {
      colorElement.classList.remove('active');
      colorElement.style.pointerEvents = 'visible';
      generateRandomColor(colorElementList, randomColorSelection);
    });
  });
}

(() => {
  const colorElementList = getColorElementList();
  const ulElementList = getUlElement();
  const timerElement = getTimerElement();
  const playAgainButton = getPlayAgainButton();
  const colorBackgroundElement = getColorBackground();
  generateRandomColor(colorElementList, randomColorSelection);
  setTimer(timerElement, playAgainButton, colorElementList);
  handleLiElementClick(ulElementList, colorBackgroundElement, selections);
  handleReplayButton(playAgainButton, timerElement, colorElementList, colorBackgroundElement);
})();
