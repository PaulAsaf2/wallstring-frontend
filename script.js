import { toggleKnitting } from './scripts/playbackHandle.js'
import {
  popup, meditationBtn, meditationText,
  playBtn, sliderEl, descriptionCloseBtn,
  closePopupBtn, point, initialDescription,
  getUserDataUrl,
} from './utils/constants.js'
import { knittingSpeedHandle } from './scripts/speedHandle.js'
import { getUserData } from './scripts/api.js'

const tg = window.Telegram.WebApp

tg.expand()
knittingSpeedHandle()
getUserData(getUserDataUrl)
  .then(() => {
    if (point.currentStep == 0) {
      showInitialPrompts()
    } else {
      
    }
  })
  .catch(err => console.log(err))

function showInitialPrompts() {
  popup.classList.add('popup_dont_worry_show')
  initialDescription.classList.add('description_show')
}

function closePopup() {
  popup.classList.remove('popup_dont_worry_show')
}

export function closeDescription() {
  initialDescription.classList.remove('description_show')
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