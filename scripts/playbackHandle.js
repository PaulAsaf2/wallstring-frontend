import {
  playBtn, delay, points, point,
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'
import { updatePoints } from './updatePoints.js'
import { updateArrowDirection } from './updateArrow.js'
import { closeDescription } from '../script.js'

let knittingId, isKnitting = false

point.source = point.B
point.source.textContent = 'B31'
point.source.classList.add('show_point')
point.source.classList.add('initial_point')

function handleKnitting() {
  if (!points[point.index]) {
    stopKnitting()
    return
  }

  updatePoints()
  updateArrowDirection()
  playSound()
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