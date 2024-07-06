import { point, tg, knittingUrl, user, knitting, test, } from '../utils/constants.js'
import { stopKnitting } from './playbackHandle.js'
import { showErrorMessage } from './errorHandle.js'

export function getUserData() {
  return new Promise((resolve, reject) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const promocode = urlParams.get('promocode')
    // const userId = tg?.initDataUnsafe?.user?.id
    const userId = '123'

    if (userId && promocode) {
      user.tgId = userId
      user.promocode = promocode

      resolve({ userId, promocode })
    } else {
      reject(new Error('Ошибка получения данных: promocode или userId отсутствуют.'))
    }
  })
}

export function getKnittingData(props) {
  const params = new URLSearchParams(props)

  return fetch(knittingUrl + 'getCodeApp.php?' + params)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Запрос на получение координат не был успешно выполнен.')
    })
    .then(data => {
      if (data && data.length > 0) {
        retrievePoints(data)
        retrieveCurrentStep(data)
      } else {
        throw new Error('Knitting data is not available')
      }
    })
}

function retrieveCurrentStep(userData) {
  if (userData[0].count == userData[0].code.split(/\s+/).length) {
    point.currentStep = 0
    point.index = 0
  } else {
    point.currentStep = userData[0].count
    point.index = userData[0].count
  }
}

export function retrievePoints(userData) {
  point.array = userData[0].code.split(/\s+/)

  console.log(point.array);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function setCurrentStep(step, attempt = 0, maxAttemts = 3, delay = 1000) {
  const params = new URLSearchParams({
    userId: user.tgId,
    promocode: user.promocode,
    newCount: step
  })

  return fetch(knittingUrl + 'setCountApp.php?' + params)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Response not ok')
    })
    .then(data => {
      if (data.success) return console.log(data)
      throw Error('An error occurred while saving a point')
    })
    .catch(error => {
      console.log(error)

      if (knitting.play) stopKnitting()

      if (attempt < maxAttemts) {
        console.log(`Retrying... (${attempt + 1} of ${maxAttemts})`);

        showErrorMessage(
          'Ошибка при связи с сервером.',
          `Попытка ${attempt + 1} из ${maxAttemts}`,
          false // попытки закончились
        )

        let nexDelay = delay * 2

        return wait(nexDelay)
          .then(() => setCurrentStep(step, attempt + 1, maxAttemts, nexDelay))
      } else {
        showErrorMessage(
          'Ошибка при связи с сервером.',
          `Попробуйте зайти позже. Вы остановились на точке ${point.array[point.index - 1]}`,
          true // попытки закончились
        )
        throw new Error('Max attemts reached')
      }
    })
}
