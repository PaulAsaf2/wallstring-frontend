import { toggleKnitting, closeDescription} from './scripts/playbackHandle.js'
import {
  popup, meditationBtn, meditationText,
  playBtn, sliderEl, descriptionCloseBtn,
  closePopupBtn,
} from './utils/constants.js'
import { knittingSpeedHandle } from './scripts/speedHandle.js'

const tg = window.Telegram.WebApp

tg.expand()
knittingSpeedHandle()

function closePopup() {
  popup.classList.add('popup_dont_worry_close')
}

function toggleMeditation() {
  meditationBtn.classList.toggle('meditaion_btn_on')
  meditationText.classList.toggle('meditation_text_show')
}

playBtn.addEventListener('click', toggleKnitting)
meditationBtn.addEventListener('click', toggleMeditation)
sliderEl.addEventListener('input', knittingSpeedHandle)
descriptionCloseBtn.addEventListener('click', closeDescription)
closePopupBtn.addEventListener('click', closePopup)