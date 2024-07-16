import { point, tg, knittingUrl, knitting, } from '../utils/constants.js'
import { stopKnitting } from './playbackHandle.js'
import { showErrorMessage } from './errorHandle.js'

export function checkInitData(initData) {
  return fetch('https://wallstring.monitour.ru/api/validate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initData })
  })
    .then(res => {
      if (res.ok) return res.json()
      throw new Error('HTTP-Error: ' + res.status)
    })
    .then(data => {
      console.log(data);
      // const user = JSON.parse(data.initData.user)
      // tg.CloudStorage.setItem('userId', user.id)
      // return user.id

      // TEMPORARY
      let fakeUserId = '123'
      tg.CloudStorage.setItem('userId', fakeUserId)

      return fakeUserId
      // ---------
    })
}

export function getPromocode() {
  return new Promise((resolve, reject) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const promocode = urlParams.get('promocode')

    if (promocode) {
      tg.CloudStorage.setItem('promocode', promocode)
      resolve(promocode)
    } else {
      reject('Promocode not found')
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
      if (data && data.length > 0) return data
      throw new Error('Knitting data is not available')
    })
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function setCurrentStep(step, attempt = 0, maxAttemts = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    tg.CloudStorage.getItems(['userId', 'promocode'], (error, value) => {
      if (error) {
        reject(error)
      } else if (!value.userId || !value.promocode) {
        console.error('Failed to process user data when saving a point')
        reject('Не удалось обработать данные пользователя при сохранении точки')
      } else {
        const params = new URLSearchParams({
          userId: value.userId,
          promocode: value.promocode,
          newCount: step
        })

        fetch(knittingUrl + 'setCountApp.php?' + params)
          .then(response => {
            if (response.ok) return response.json()
            throw new Error('Response not ok')
          })
          .then(data => {
            if (data.success) {
              console.log(data)
              resolve()
            } else {
              throw Error('An error occurred while saving a point')
            }
          })
          .catch(error => {
            console.error(error)

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

              reject('Max attemts reached')
            }
          })
      }
    })
  })
}
