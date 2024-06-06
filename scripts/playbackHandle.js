import {
  playBtn, delay, points, arrow, point, initialDescription
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'

let knittingId, isKnitting = false

point.source = point.B
point.source.textContent = 'B31'
point.source.classList.add('show_point')
// point.source.classList.add('initial_point')

// export function closeDescription() {
//   point.source.classList.remove('initial_point')
//   initialDescription.style.display = 'none';
// }

function updateArrowDirection() {
  let s = point.source.textContent.charAt(0).toLowerCase()
  let t = point.target.textContent.charAt(0).toLowerCase()
  
  arrow.classList.remove(arrow.classList[1])
  arrow.classList.add(`arrow_${s}-${t}`)
}

function updatePoints() {
  if (point.index > 0) {
    let sourceLetter = point.source.textContent.charAt(0)
    let targetLetter = point.target?.textContent.charAt(0)

    if (sourceLetter == targetLetter) {
      point.source.textContent = point.target?.textContent
    } else {
      point.source.classList.remove('show_point')
      point.source = point.target
    }
  }
  
  let sourceLetter = point.source.textContent.charAt(0)
  let targetLetter = points[point.index].charAt(0)

  if (sourceLetter == targetLetter) {
    point.target = point[`${targetLetter}2`]
  } else {
    point.target = point[targetLetter]
    point[`${sourceLetter}2`].classList.remove('show_point')
  }
      
  point.target.textContent = points[point.index]
  point.target.classList.add(`show_point`)
}

function handleKnitting() {
  if (!points[point.index]) {
    stopKnitting()
    return
  }

  let letter = points[point.index].charAt(0)
  let number = points[point.index].slice(1)

  updatePoints()
  // updateArrowDirection()
  // playSound(letter, number)
  // updateProgressBar(point.index + 1, points.length)

  point.index++

  if (point.index == points.length) stopKnitting()
}

function startKnitting() {
  if (!points[point.index]) stopKnitting()
  // if (point.index == 0) closeDescription()

  playBtn.classList.add('trigger_btn_pause')
  playBtn.textContent = 'Пауза'

  isKnitting = true

  handleKnitting()
}

function stopKnitting() {
  playBtn.textContent = 'Старт'
  playBtn.classList.remove('trigger_btn_pause')

  clearTimeout(knittingId)

  isKnitting = false
}

export function toggleKnitting() {
  if (!isKnitting) {
    startKnitting()

    knittingId = setTimeout(function startInterval() {
      handleKnitting()

      knittingId = setTimeout(startInterval, delay.betweenPoints)
    }, delay.betweenPoints)
  } else {
    stopKnitting()
  }
}