import { togglePlay } from './scripts/playbackHandle.js'
import { playBtn, sliderEl } from './utils/constants.js'
import { speedHandle, speedHandleWhenPageLoad } from './scripts/speedHandle.js'

const popup = document.querySelector('.popup_dont_worry')
const meditationBtn = document.querySelector('.meditaion_btn_off')
const meditationText = document.querySelector('.meditation_text')

const tg = window.Telegram.WebApp

tg.expand()
speedHandleWhenPageLoad()

function closePopup() {
  popup.classList.add('popup_dont_worry_close')
}

function toggleMeditation() {
  meditationBtn.classList.toggle('meditaion_btn_on')
  meditationText.classList.toggle('meditation_text_show')
}

playBtn.addEventListener('click', togglePlay)
meditationBtn.addEventListener('click', toggleMeditation)
sliderEl.addEventListener("input", speedHandle)