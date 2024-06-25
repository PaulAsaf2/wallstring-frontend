import { point, /*points*/ } from '../utils/constants.js'

export function setSourcePoint(isInitialPoint) {
  if (isInitialPoint) {
    point.source = point.B
    point.source.textContent = 'B31'
  } else {
    let letter = point.array[point.currentStep - 1].charAt(0)
    point.source = point[letter]
    point.source.textContent = point.array[point.currentStep - 1]
  }

  point.source.classList.add('show_point')
  point.source.classList.add('initial_point')
  point.initial = true
}

function updateSourcePoint() {
  let sourceLetter = point.source.textContent.charAt(0)
  let targetLetter = point.target?.textContent.charAt(0)

  if (sourceLetter == targetLetter) {
    point.source.textContent = point.target?.textContent
  } else {
    point.source.classList.remove('show_point')
    point.source = point.target
  }
}

function updateTargetPoint() {
  let sourceLetter = point.source.textContent.charAt(0)
  let targetLetter = point.array[point.index].charAt(0)

  if (sourceLetter == targetLetter) {
    point.target = point[`${targetLetter}2`]
  } else {
    point.target = point[targetLetter]
    point[`${sourceLetter}2`].classList.remove('show_point')
  }

  point.target.textContent = point.array[point.index]
  point.target.classList.add(`show_point`)
}

export function updatePoints() {
  if (!point.initial) {
    updateSourcePoint()
  }

  updateTargetPoint()
  point.initial = false
}