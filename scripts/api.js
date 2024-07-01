import { point, tg, knittingUrl, user } from '../utils/constants.js'
import { stopKnitting } from './playbackHandle.js'

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

export async function setCurrentStep(step) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true

      if (success) {
        resolve({ success: true, message: "Count updated successfully" })
      } else {
        reject('Something went wrong')
      }
    }, 2000)
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
