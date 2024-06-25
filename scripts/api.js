import { point } from '../utils/constants.js'
import { stopKnitting } from './playbackHandle.js'

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
  point.currentStep = userData[0].count
  point.index = userData[0].count
}

export function retrievePoints(userData) {
  console.log(userData[0].code.split(/\s+/));

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
