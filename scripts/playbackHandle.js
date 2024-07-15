import {
  delay, point, knitting, tg,
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'
import { updatePoints, setSourcePoint } from './updatePoints.js'
import { updateArrowDirection, resetArrows } from './updateArrow.js'
import { closeDescription } from '../script.js'
import { setCurrentStep } from './api.js'

function handleKnitting() {
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
    .catch(error => {
      if (knitting.play) stopKnitting()
      tg.showAlert(error)
    })
}

function continueKnitting() {
  knitting.id = setTimeout(handleKnitting, delay.betweenPoints)
}

function startKnitting() {
  if (!point.array[point.index]) stopKnitting()
  if (point.index == 0) closeDescription()

  tg.MainButton.setParams({
    text: 'ПАУЗА',
    color: '#2DA122',
  })

  knitting.play = true

  handleKnitting()
}

export function stopKnitting() {
  // End of points array?
  if (point.index == point.array.length) {
    tg.MainButton.setText('СНАЧАЛА')
    tg.MainButton.setParams({
      text: 'СНАЧАЛА',
      color: '#E3B422',
    })

    knitting.end = true
  } else {
    tg.MainButton.setParams({
      text: 'СТАРТ',
      color: '#E34D4D',
    })
  }

  clearTimeout(knitting.id)

  knitting.play = false
}

function resetKnitting() {
  point.index = 0
  point.currentStep = 0

  tg.MainButton.setParams({
    text: 'СТАРТ',
    color: '#E34D4D',
  })

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