import { sliderEl } from '../utils/constants.js'

export function speedHandle(event) {
  let sliderValue = event.target.value;
  let percent = (sliderValue == 2) ? 25
    : (sliderValue == 3) ? 37.5
    : (sliderValue == 4) ? 50
    : (sliderValue == 5) ? 62.5
    : (sliderValue == 6) ? 75
    : (sliderValue == 7) ? 87.5
    : (sliderValue == 8) ? 100
    : 0;

  sliderEl.style.background = `
    linear-gradient(to right, #5C52C0 ${percent}%, #F1F0F2 ${percent}%)`;
}