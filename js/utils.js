import { GAME_TIME } from './constants.js';

export function checkWin(colorElementList) {
  const listLength = Array.from(colorElementList).filter((x) => x.classList.contains('active'));
  return listLength.length === colorElementList.length;
}

export function disableAllLiElementWhenLose(colorElementList) {
  colorElementList.forEach((liElement) => {
    liElement.style.pointerEvents = 'none';
  });
}

export function setTimer(timerElement, playAgainButton, colorElementList) {
  let time = GAME_TIME;
  const timeInterval = setInterval(() => {
    if (time === 0 && !checkWin(colorElementList)) {
      clearInterval(timeInterval);
      timerElement.innerText = 'GAME OVER 😭😭😭';
      playAgainButton.style.display = 'block';
      disableAllLiElementWhenLose(colorElementList);
      return;
    }
    if (checkWin(colorElementList)) {
      clearInterval(timeInterval);
      timerElement.innerText = 'YOU WIN 😍😍😍';
      playAgainButton.style.display = 'block';
      return;
    }
    timerElement.innerText = time;
    time--;
  }, 1000);
}

export function generateRandomColor(colorElementList, randomColorSelection) {
  const randomIndex = Math.floor(Math.random() * randomColorSelection.length);
  const randomColorValue = randomColor(randomColorSelection[randomIndex]);
  let randomValueArr = [...randomColorValue];
  colorElementList.forEach((colorElement) => {
    if (randomValueArr.length === 0) randomValueArr = [...randomColorValue];
    const index = Math.floor(Math.random() * randomValueArr.length);
    const overlayElement = colorElement.querySelector('.overlay');

    overlayElement.style.backgroundColor = randomValueArr[index];
    randomValueArr.splice(index, 1);
  });
}

export function highlightMatchingLi(colorElementList, firstColor) {
  colorElementList.forEach((liElement) => {
    const overlay = liElement.querySelector('.overlay');
    if (getComputedStyle(overlay).backgroundColor === firstColor) {
      liElement.style.pointerEvents = 'none';
      liElement.className = 'active';
    }
  });
}

export function disableHighlightLi(firstSelection, secondSelection) {
  if (firstSelection && secondSelection) {
    firstSelection.element.classList.remove('active');
    firstSelection.element.style.pointerEvents = 'visible';
    secondSelection.element.classList.remove('active');
    secondSelection.element.style.pointerEvents = 'visible';
  }
}
