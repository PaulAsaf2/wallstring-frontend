import { point } from '../utils/constants.js'

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

export function setCurrentStep(step) {
  const setStepUrl = `https://pin.sourctech.ru/telegram/string/setCountApp.php?userId=123&promocode=0ZL-N88-CWZ-BD3&newCount=${step}`
  fetch(setStepUrl)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network reponse was not ok')
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
}
