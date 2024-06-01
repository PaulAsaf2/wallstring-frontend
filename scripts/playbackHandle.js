import {
  playBtn, delay, points, arrow, point, initialDescription
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'

let knittingId, isKnitting = false

point.source = point.B
point.source.textContent = 'B31'
point.source.classList.add('point-b')
point.source.classList.add('initial_point')

export function closeDescription() {
  point.source.classList.remove('initial_point')
  initialDescription.style.display = 'none';
}

function updateArrowDirection() {
  let s = point.source.textContent.charAt(0).toLowerCase()
  let t = point.target.textContent.charAt(0).toLowerCase()
  
  arrow.classList.remove(arrow.classList[1])
  arrow.classList.add(`arrow_${s}-${t}`)
}

function updatePoints() {
  if (point.index > 0) {
    let letter = point.source.textContent.charAt(0).toLowerCase()

    point.source.classList.remove(`point-${letter}`)
    point.source = point.target
  }

  let letter = points[point.index].charAt(0).toLowerCase()

  switch (letter) {
    case 'a': point.target = point.A
      break
    case 'b': point.target = point.B
      break
    case 'c': point.target = point.C
      break
    case 'd': point.target = point.D
  }

  point.target.textContent = points[point.index]
  point.target.classList.add(`point-${letter}`)
}

function handleKnitting() {
  if (!points[point.index]) {
    stopKnitting()
    return
  }

  let letter = points[point.index].charAt(0)
  let number = points[point.index].slice(1)

  updatePoints()
  updateArrowDirection()
  playSound(letter, number)
  updateProgressBar(point.index + 1, points.length)

  point.index++

  if (point.index == points.length) stopKnitting()
}

function startKnitting() {
  if (!points[point.index]) stopKnitting()
  if (point.index == 0) closeDescription()

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