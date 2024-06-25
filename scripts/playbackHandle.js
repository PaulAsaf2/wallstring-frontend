import {
  playBtn, delay, point,
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'
import { updatePoints } from './updatePoints.js'
import { updateArrowDirection } from './updateArrow.js'
import { closeDescription } from '../script.js'
import { setCurrentStep } from './api.js'

let knittingId, isKnitting = false

function handleKnitting() {
  if (!point.array[point.index]) {
    stopKnitting()
    return
  }

  updatePoints()
  updateArrowDirection()
  playSound()
  updateProgressBar(point.index + 1, point.array.length)
  setCurrentStep(point.index + 1)

  point.index++

  if (point.index == point.array.length) stopKnitting()
}

function startKnitting() {
  if (!point.array[point.index]) stopKnitting()
  if (point.index == 0) closeDescription()

  playBtn.classList.add('trigger_btn_pause')
  playBtn.textContent = 'Пауза'

  isKnitting = true

  handleKnitting()
}

export function stopKnitting() {
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