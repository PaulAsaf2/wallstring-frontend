import { point, tg, user } from '../utils/constants.js'
import { stopKnitting } from './playbackHandle.js'

export function getAuthData() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const promocode = urlParams.get('promocode')

  const userId = tg?.initDataUnsafe?.user?.id

  user.promocode = promocode
  user.tgId = userId

  console.log(user);
}

export function getUserData(link) {
  return fetch(link)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network reponse was not ok')
    })
    .then(data => {
      retrievePoints(data)
      retrieveCurrentStep(data)
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
}

export function setCurrentStep(step, retryCount = 0) {
  const maxRetryCount = 0
  const setStepUrl = `https://pin.sourctech.ru/telegram/string/setCountApp.php?userId=123&promocode=0ZL-N88-CWZ-BD3&newCount=${step}`
  fetch(setStepUrl)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network reponse was not ok')
    })
    .then(data => {
      if (data.success) return console.log(data)
      throw Error('An error occurred when saving the Count №' + step)
    })
    .catch(err => {
      console.log(err)
      if (retryCount < maxRetryCount) {
        console.log(`Retrying... Atempt ${retryCount}`);
        setCurrentStep(step, retryCount + 1)
      } else {
        console.log('Max retry attempts reached. We could not save a point №' + step);
        stopKnitting()
      }
    })
}
