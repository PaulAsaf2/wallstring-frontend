// import { sliderEl, delay } from '../utils/constants.js'

// export function speedHandle(event) {
//   let sliderValue = event.target.value;
//   let percent = (sliderValue == 2) ? 20
//     : (sliderValue == 3) ? 32.5
//     : (sliderValue == 4) ? 45
//     : (sliderValue == 5) ? 57.5
//     : (sliderValue == 6) ? 70
//     : (sliderValue == 7) ? 82.5
//     : (sliderValue == 8) ? 95
//     : 0;

//   sliderEl.style.background = `
//     linear-gradient(to right, #5C52C0 ${percent}%, #F1F0F2 ${percent}%)`;

//   delay.betweenPoints = sliderValue * 1000
//   localStorage.setItem('range', sliderValue)
// }

// export function speedHandleWhenPageLoad() {
//   sliderEl.value = localStorage.getItem('range')
//   let sliderValue = sliderEl.value;
//   let percent = (sliderValue == 2) ? 20
//     : (sliderValue == 3) ? 32.5
//     : (sliderValue == 4) ? 45
//     : (sliderValue == 5) ? 57.5
//     : (sliderValue == 6) ? 70
//     : (sliderValue == 7) ? 82.5
//     : (sliderValue == 8) ? 95
//     : 0;

//   sliderEl.style.background = `
//     linear-gradient(to right, #5C52C0 ${percent}%, #F1F0F2 ${percent}%)`;

//   delay.betweenPoints = sliderValue * 1000
// }