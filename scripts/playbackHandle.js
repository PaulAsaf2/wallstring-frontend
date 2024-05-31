import {
  playBtn, delay, points, pointA, pointB, pointC,
  pointD, arrow,
} from '../utils/constants.js'
import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'

let sourcePoint, targetPoint, knittingId,
  index = 0, isKnitting = false

sourcePoint = pointB
sourcePoint.textContent = 'B31'
sourcePoint.classList.add('point-b')

function updateArrowDirection() {
  let s = sourcePoint.textContent.charAt(0).toLowerCase()
  let t = targetPoint.textContent.charAt(0).toLowerCase()
  
  arrow.classList.remove(arrow.classList[1])
  arrow.classList.add(`arrow_${s}-${t}`)
}

function updatePoints() {
  if (index > 0) {
    let letter = sourcePoint.textContent.charAt(0).toLowerCase()

    sourcePoint.classList.remove(`point-${letter}`)
    sourcePoint = targetPoint
  }

  let letter = points[index].charAt(0).toLowerCase()

  switch (letter) {
    case 'a': targetPoint = pointA
      break
    case 'b': targetPoint = pointB
      break
    case 'c': targetPoint = pointC
      break
    case 'd': targetPoint = pointD
  }

  targetPoint.textContent = points[index]
  targetPoint.classList.add(`point-${letter}`)
}

function handleKnitting() {
  if (!points[index]) {
    stopKnitting()
    return
  }

  let letter = points[index].charAt(0)
  let number = points[index].slice(1)

  updatePoints()
  updateArrowDirection()
  playSound(letter, number)
  updateProgressBar(index + 1, points.length)

  index++

  if (index == points.length) stopKnitting()
}

function startKnitting() {
  if (!points[index]) stopKnitting()

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