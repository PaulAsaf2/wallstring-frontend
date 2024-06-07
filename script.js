import { toggleKnitting } from './scripts/playbackHandle.js'
import {
  popup, meditationBtn, meditationText,
  playBtn, sliderEl, descriptionCloseBtn,
  closePopupBtn, point, initialDescription
} from './utils/constants.js'
import { knittingSpeedHandle } from './scripts/speedHandle.js'

const tg = window.Telegram.WebApp

tg.expand()
knittingSpeedHandle()

function closePopup() {
  popup.classList.add('popup_dont_worry_close')
}

export function closeDescription() {
  point.source.classList.remove('initial_point')
  initialDescription.style.display = 'none';
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