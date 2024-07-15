import { toggleKnitting } from './scripts/playbackHandle.js'
import {
  popup, meditationBtn, meditationText,
  sliderEl, descriptionCloseBtn,
  closePopupBtn, point, initialDescription,
  tg,
} from './utils/constants.js'
import { knittingSpeedHandle } from './scripts/speedHandle.js'
import {/* getUserData,*/ getKnittingData, checkInitData, getPromocode } from './scripts/api.js'
import { setSourcePoint } from './scripts/updatePoints.js'
import { updateProgressBar } from './scripts/progressBarHandle.js'
import { showErrorMessage, hideErrorMessage, linkToTelegram } from './scripts/errorHandle.js'
import { setColorStyle } from './utils/style.js'

tg.expand()
setColorStyle()

checkInitData(tg.initData)
  .then(userId => {
    getPromocode()
      .then(promocode => {
        getKnittingData({ userId, promocode })
          .then(() => {
            updateProgressBar(point.currentStep, point.array.length)
            knittingSpeedHandle()

            if (point.currentStep == 0) {
              showInitialPrompts()
              setSourcePoint(true) // set initial point
            } else {
              setSourcePoint(false) // set current point
            }

            console.log(
              tg.CloudStorage.getItems(['userId', 'promocode'], (error, value) => {
                if (error) {
                  console.error(error)
                } else {
                  console.log(value);
                }
              }),
            );
          })
          .catch(err => {
            console.error(err)
            tg.showAlert('Не удалось получить данные для шитья')
            tg.MainButton.disable()
          })
      })
      .catch(error => {
        console.error(error)
        tg.showAlert('Промокод не найден.')
      })
  })
  .catch(error => {
    console.error(error)
    linkToTelegram()
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