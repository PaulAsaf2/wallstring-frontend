import {
  playBtn, delay, points, pointA, pointB, pointC,
  pointD,
} from '../utils/constants.js'
// import { updateProgressBar } from './progressBarHandle.js'
import { playSound } from './soundHandle.js'

// const arrow = document.querySelector('.arrow')
// let source, target, s, t //s,t - first letter of point e.g. A or C etc.
// let playID = null
let sourcePoint, targetPoint, knittingId,
  index = 0, isKnitting = false

sourcePoint = pointB
sourcePoint.textContent = 'B31'
sourcePoint.classList.add('point-b')

// function updateArrowDirection() {
//   s = source.textContent.charAt(0).toLowerCase()
//   t = target.textContent.charAt(0).toLowerCase()

//   arrow.classList.add(`arrow_${s}-${t}`)
// }

// function updateTargetPoint() {
//   switch (points[index].charAt(0).toLowerCase()) {
//     case 'a': target = pointA
//       break
//     case 'b': target = pointB
//       break
//     case 'c': target = pointC
//       break
//     case 'd': target = pointD
//   }

//   target.textContent = points[index]
//   target.classList.add(`point-${points[index].charAt(0).toLowerCase()}`)
// }



function handleKnitting() {
  if (!points[index]) {
    stopKnitting()
    return
  }

  let letter = points[index].charAt(0)
  let number = points[index].slice(1)

  playSound(letter, number)

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
    // knittingId = setTimeout(function play() {
    // index++

    // source.classList.remove(`point-${s}`)
    // arrow.classList.remove(arrow.classList[1])

    // source = target
    // target = points[index]

    // updateTargetPoint()
    // updateArrowDirection()
    // updateProgressBar(index + 1, points.length)

    //   knittingId = setTimeout(play, delay.betweenPoints)
    // }, delay.betweenPoints)


  } else {
    stopKnitting()

  }
}