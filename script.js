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
import { showErrorMessage, hideErrorMessage } from './scripts/errorHandle.js'
import { setColorStyle } from './utils/style.js'

tg.expand()
setColorStyle()

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
      .catch(err => {
        console.error(err)
        tg.showAlert('Не удалось получить данные для шитья')
      })
  })
  .catch(err => {
    console.log(err)
    tg.showAlert('Не удалось получить данные пользователя')
  })

function showInitialPrompts() {
  popup.classList.add('popup_fullwidth_show')
  initialDescription.classList.add('description_show')
}

function closePopup() {
  popup.classList.remove('popup_fullwidth_show')
}

export function closeDescription() {
  initialDescription.classList.remove('description_show')
}

function toggleMeditation() {
  meditationBtn.classList.toggle('meditaion_btn_on')
  meditationText.classList.toggle('meditation_text_show')
}

tg.MainButton.setParams({
  text: 'СТАРТ',
  color: '#E34D4D',
  is_visible: true,
})
tg.MainButton.onClick(toggleKnitting)
meditationBtn.addEventListener('click', toggleMeditation)
sliderEl.addEventListener('input', knittingSpeedHandle)
descriptionCloseBtn.addEventListener('click', closeDescription)
closePopupBtn.addEventListener('click', closePopup)
window.addEventListener('offline', function () {
  showErrorMessage(
    'Нет подключения к интернету',
    `Вы остановились на точке ${point.array[point.index - 1]}`,
    true // попытки закончились
  )

  tg.MainButton.hide()
})
window.addEventListener('online', function () {
  hideErrorMessage()
  tg.MainButton.show()
})