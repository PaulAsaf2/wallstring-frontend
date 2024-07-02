import {
  playBtn, delay, point, knitting,
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'
import { updatePoints, setSourcePoint } from './updatePoints.js'
import { updateArrowDirection, resetArrows } from './updateArrow.js'
import { closeDescription } from '../script.js'
import { setCurrentStep } from './api.js'

async function handleKnitting() {
  if (!point.array[point.index]) {
    stopKnitting()
    return
  }

  setCurrentStep(point.index + 1)
    .then(() => {
      updatePoints()
      updateArrowDirection()
      playSound()
      updateProgressBar(point.index + 1, point.array.length)

      point.index++

      if (point.index == point.array.length) {
        stopKnitting()
        return
      }

      if (knitting.play) {
        continueKnitting()
      }
    })
    .catch(err => {
      console.log(err)
    })
}

function continueKnitting() {
  knitting.id = setTimeout(handleKnitting, delay.betweenPoints)
}

function startKnitting() {
  if (!point.array[point.index]) stopKnitting()
  if (point.index == 0) closeDescription()

  playBtn.classList.add('trigger_btn_pause')
  playBtn.textContent = 'Пауза'

  knitting.play = true

  handleKnitting()
}

export function stopKnitting() {
  playBtn.classList.remove('trigger_btn_pause')

  // End of points array?
  if (point.index == point.array.length) {
    playBtn.textContent = 'Сначала'
    playBtn.classList.add('trigger_btn_reload')

    knitting.end = true
  } else {
    playBtn.textContent = 'Старт'
  }

  clearTimeout(knitting.id)

  knitting.play = false
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

  knitting.end = false
}

export function toggleKnitting() {
  if (!knitting.play) {
    if (knitting.end) {
      resetKnitting()
    } else {
      startKnitting()
    }
  } else {
    stopKnitting()
  }
}