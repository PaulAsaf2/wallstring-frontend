import {
  playBtn, delay, point,
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'
import { updatePoints, setSourcePoint } from './updatePoints.js'
import { updateArrowDirection, resetArrows } from './updateArrow.js'
import { closeDescription } from '../script.js'
import { setCurrentStep } from './api.js'

let knittingId, isKnitting = false, isEnd = false

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

  if (point.index == point.array.length) {
    stopKnitting()
  }
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
  playBtn.classList.remove('trigger_btn_pause')

  if (point.index == point.array.length) {
    playBtn.textContent = 'Сначала'
    playBtn.classList.add('trigger_btn_reload')
    isEnd = true
  } else {
    playBtn.textContent = 'Старт'
  }

  clearTimeout(knittingId)

  isKnitting = false
}

export function toggleKnitting() {
  if (!isKnitting) {
    if (isEnd) {
      point.index = 0
      point.currentStep = 0

      playBtn.textContent = 'Старт'
      playBtn.classList.remove('trigger_btn_reload')

      point.source.classList.remove('show_point')
      point.target.classList.remove('show_point')

      point.source = null
      point.target = null
      
      resetArrows()
      updateProgressBar(point.index, point.array.length)
      setSourcePoint(true)
      stopKnitting()

    } else {
      startKnitting()

      knittingId = setTimeout(function startInterval() {
        handleKnitting()

        knittingId = setTimeout(startInterval, delay.betweenPoints)
      }, delay.betweenPoints)
    }
  } else {
    stopKnitting()
  }
}