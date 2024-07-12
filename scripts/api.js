import { point, tg, knittingUrl, user, knitting, test, } from '../utils/constants.js'
import { stopKnitting } from './playbackHandle.js'
import { showErrorMessage } from './errorHandle.js'

function checkInitData(initData) {
  fetch('http://127.0.0.1:3002/check-initdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: initData
  })
    .then(res => {
      if (res.ok) return res.json()
      throw new Error('HTTP-Error: ' + res.status)
    })
    .then(data => {
      const user = JSON.parse(data.initData.user)
      return user.id
    })
    
}

export function getUserData() {
  return new Promise((resolve, reject) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const promocode = urlParams.get('promocode')
    
    let userId = tg?.initDataUnsafe?.user?.id
    
    checkInitData(tg.initData)

    // Temporary!
    if (userId) {
      userId = '123'
    }
    // ---------

    if (!userId) {
      const error = new Error('ID пользователя Телеграм не найден')
      error.data = { isNotTelegram: true }
      
      reject(error)
    } else if (!promocode) {
      const error = new Error('Промокод пользователя на найден')
      error.data = { isNotTelegram: false }

      reject(error)
    } else {
      user.tgId = userId
      user.promocode = promocode

      resolve({ userId, promocode })
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

        tg.MainButton.hide()

        let nexDelay = delay * 2

        return wait(nexDelay)
          .then(() => setCurrentStep(step, attempt + 1, maxAttemts, nexDelay))
      } else {
        showErrorMessage(
          'Ошибка при связи с сервером.',
          `Попробуйте зайти позже. Вы остановились на точке ${point.array[point.index - 1]}`,
          true // попытки закончились
        )

        tg.MainButton.hide()

        throw new Error('Max attemts reached')
      }
    })
}
