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

async function handleKnitting() {
  if (!point.array[point.index]) {
    stopKnitting()
    return
  }

  updatePoints()
  updateArrowDirection()
  playSound()
  updateProgressBar(point.index + 1, point.array.length)

  try {
    const stepIsSaved = await setCurrentStep(point.index + 1)
    console.log(stepIsSaved);
    point.index++

    if (point.index == point.array.length) {
      stopKnitting()
      return
    }

    if (isKnitting) {
      continueKnitting()
    }
  } catch (err) {
    console.log('Не удалось сохранить точку ' + point.array[point.index]);
    console.log(err)
    stopKnitting()
  }
}

function continueKnitting() {
  knittingId = setTimeout(handleKnitting, delay.betweenPoints)
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

  // End of points array?
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

function resetKnitting() {
  point.index = 0
  point.currentStep = 0

  playBtn.textContent = 'Старт'
  playBtn.classList.remove('trigger_btn_reload')

  point.source.classList.remove('show_point')
  point.target.classList.remove('show_point')

  resetArrows()
  updateProgressBar(point.index, point.array.length)
  setSourcePoint(true)
  setCurrentStep(0)
  stopKnitting()

  isEnd = false
}

export function toggleKnitting() {
  if (!isKnitting) {
    if (isEnd) {
      resetKnitting()
      return
    }

    startKnitting()
  } else {
    stopKnitting()
  }
}