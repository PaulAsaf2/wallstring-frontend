import { togglePlay } from './scripts/playbackHandle.js'
import { playBtn } from './utils/constants.js'
const sliderEl = document.querySelector("#range")
const popup = document.querySelector('.popup_dont_worry')
const meditationBtn = document.querySelector('.meditaion_btn_off')
const meditationText = document.querySelector('.meditation_text')

const tg = window.Telegram.WebApp

tg.expand()

sliderEl.addEventListener("input", (event) => {
  let sliderValue = event.target.value;
  let percent = (sliderValue == 2) ? 25
    : (sliderValue == 3) ? 50
      : (sliderValue == 4) ? 75
        : (sliderValue == 5) ? 100
          : 0;

  sliderEl.style.background = `
    linear-gradient(to right, #5C52C0 ${percent}%, #F1F0F2 ${percent}%)`;
})

function closePopup() {
  popup.classList.add('popup_dont_worry_close')
}

function toggleMeditation() {
  meditationBtn.classList.toggle('meditaion_btn_on')
  meditationText.classList.toggle('meditation_text_show')
}

playBtn.addEventListener('click', togglePlay)
meditationBtn.addEventListener('click', toggleMeditation)