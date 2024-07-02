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
      reject(new Error('Failed to retrieve data: promocode or userId missing'))
    }
  })
}

export function getKnittingData(props) {
  const params = new URLSearchParams(props)

  return fetch(knittingUrl + 'getCodeApp.php?' + params)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network reponse was not ok')
    })
    .then(data => {
      if (data) {
        retrievePoints(data)
        retrieveCurrentStep(data)
      } else {
        throw new Error('No knitting data available')
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

function mockData() {
  return { success: true, message: "Count updated successfully" }
}

function mockFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true

      if (success) {
        resolve({ ok: test.test })
      } else {
        reject('Request failed')
      }
    }, 100)
  })
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function setCurrentStep(step, attempt = 0, maxAttemts = 3, delay = 1000) {
  console.log(`Attempt ${attempt} of ${maxAttemts}`)

  return mockFetch()
    .then(response => {
      if (response.ok) {
        return mockData()
      }
      throw new Error('Response not ok')
    })
    .then(data => {
      if (!data.success) {
        throw Error('An error occurred while saving a point')
      }
    })
    .catch(error => {
      if (knitting.play) stopKnitting()

      console.log(error)

      if (attempt < maxAttemts) {
        let nexDelay = delay * 2
        console.log(`Retrying... (${attempt + 1} of ${maxAttemts} in ${nexDelay / 1000} sec)`);

        showErrorMessage(
          'Ошибка при связи с сервером.',
          `Попытка ${attempt + 1} из ${maxAttemts}`,
          false
        )

        return wait(nexDelay).then(() => setCurrentStep(step, attempt + 1, maxAttemts, nexDelay))
      } else {
        showErrorMessage(
          'Ошибка при связи с сервером.',
          `Попробуйте зайти позже. Вы остановились на точке ${point.array[point.index - 1]}`,
          true
        )
        throw new Error('Max attemts reached')
      }
    })

  /*
  const params = new URLSearchParams({
    userId: user.tgId,
    promocode: user.promocode,
    newCount: step
  })

  return fetch(knittingUrl + 'setCountApp.php?' + params)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Не можем связаться с сервером для сохранения точки ')
    })
    .then(data => {
      if (data.success) return data.success
      throw Error('Произошла ошибка при сохранении точки ')
    })
  */
}
