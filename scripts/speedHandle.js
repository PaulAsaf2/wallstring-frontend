import { sliderEl, delay } from '../utils/constants.js'

export function knittingSpeedHandle(event) {
  let sliderValue
  
  if (event) {
    sliderValue = event.target.value;
  } else {
    sliderEl.value = localStorage.getItem('range')
    sliderValue = sliderEl.value;
  }

  let percent = (sliderValue == 2) ? 20
    : (sliderValue == 3) ? 32.5
    : (sliderValue == 4) ? 45
    : (sliderValue == 5) ? 57.5
    : (sliderValue == 6) ? 70
    : (sliderValue == 7) ? 82.5
    : (sliderValue == 8) ? 95
    : 0;

  sliderEl.style.background = `
    linear-gradient(to right, #5C52C0 ${percent}%, #F1F0F2 ${percent}%)`;

  delay.betweenPoints = sliderValue * 1000

  if (event) localStorage.setItem('range', sliderValue)
}