import { toggleKnitting } from './scripts/playbackHandle.js'
import {
  popup, meditationBtn, meditationText,
  playBtn, sliderEl, descriptionCloseBtn,
  closePopupBtn, point, initialDescription,
  tg,
} from './utils/constants.js'
import { knittingSpeedHandle } from './scripts/speedHandle.js'
import { getUserData, getKnittingData } from './scripts/api.js'
import { setSourcePoint } from './scripts/updatePoints.js'
import { updateProgressBar } from './scripts/progressBarHandle.js'

tg.expand()

getUserData()
  .then(data => {
    getKnittingData(data)
      .then(() => {
        updateProgressBar(point.currentStep, point.array.length)
        knittingSpeedHandle()

        if (point.currentStep == 0) {
          showInitialPrompts()
          setSourcePoint(true) // set initial point
        } else {
          setSourcePoint(false) // set current point
        }
      })
      .catch(err => console.log(err))
  })
  .catch(err => {
    console.log(err)
    tg.showConfirm('Приложению не удалось считать данные пользователя. Хотите выполнить перезагрузку?', (yes) => {
      if (yes) {
        getUserData()
        console.log('Повторная загрузка данных');
      } else {
        console.log('Вы нажали "нет"');
      }
    })
  })

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