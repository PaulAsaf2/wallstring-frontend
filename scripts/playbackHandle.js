import { playBtn, obj } from '../utils/constants.js'
import { progressBarHandle } from './progressBarHandle.js'
import { voiceHandle } from './soundHandle.js'
const pointA = document.getElementById('point-a')
const pointB = document.getElementById('point-b')
const pointC = document.getElementById('point-c')
const pointD = document.getElementById('point-d')
const arrow = document.querySelector('.arrow')
let source, target, s, t //s,t - first letter of point e.g. A or C etc.
let playID = null
let count = 0 // point couner

// const testBtn = document.getElementById('test')

// testBtn.addEventListener('click', () => {
//   voiceHandle(target.textContent)
// })

// console.log(testBtn);

// const points = ['A9', 'D45', 'C13', 'B46', 'C23', 'D39', 'A32', 'B19', 'A31', 'D29', 'A25', 'D18', 'C37', 'B31', 'C17', 'B41', 'A30', 'B29', 'C41', 'D34', 'C34', 'D32', 'C36', 'D24', 'A39', 'D23', 'A41', 'B52', 'C12', 'D56', 'C11', 'D55', 'C9', 'D52', 'C7', 'D51', 'A6', 'B56', 'A4', 'B8', 'A44', 'B30', 'C28', 'B40', 'A43', 'D26', 'C45', 'D17', 'C51', 'D14', 'C44', 'D31', 'A27', 'B21', 'A51', 'D42', 'C24', 'D21', 'C42', 'B43', 'C16', 'D49', 'C18', 'B35', 'C33', 'B23', 'A13', 'B29', 'C30', 'B25', 'C36', 'D22', 'C39', 'D39', 'A17', 'D43', 'A24', 'B45', 'C28', 'D31', 'A28', 'B40', 'A33', 'B17', 'B1', 'C6', 'B46', 'A26', 'D32', 'A36', 'B11', 'C10', 'D54', 'C11', 'B55', 'A46', 'B3', 'D58', 'C2', 'A1']
const points = ['A9', 'C13', 'D45', 'B46', 'C20']

source = pointB
source.textContent = 'B31'
source.classList.add('point-b')

function playbackHandling() {
  switch (points[count].charAt(0).toLowerCase()) {
    case 'a': target = pointA
      break
    case 'b': target = pointB
      break
    case 'c': target = pointC
      break
    case 'd': target = pointD
  }

  target.textContent = points[count]
  target.classList.add(`point-${points[count].charAt(0).toLowerCase()}`)

  // voiceHandle(target.textContent)
  // let voice = new Audio('../sounds/A.mp3')
  // voice.play()

  // testBtn.click()

  s = source.textContent.charAt(0).toLowerCase()
  t = target.textContent.charAt(0).toLowerCase()

  arrow.classList.add(`arrow_${s}-${t}`)

  progressBarHandle(count + 1, points.length)
}

export function togglePlay() {
  if (!playBtn.classList.contains('trigger_btn_pause')) {
    playBtn.classList.add('trigger_btn_pause')
    playBtn.textContent = 'Пауза'

    playbackHandling()
    voiceHandle(target.textContent)

    playID = setTimeout(function play() {
      count++
      if (!points[count]) {
        playBtn.textContent = 'Старт'
        playBtn.classList.remove('trigger_btn_pause')
        return
      }

      source.classList.remove(`point-${s}`)
      arrow.classList.remove(arrow.classList[1])

      source = target
      target = points[count]

      playbackHandling()
      voiceHandle(target.textContent)

      playID = setTimeout(play, obj.delay)
    }, obj.delay)
  } else {
    playBtn.textContent = 'Старт'
    playBtn.classList.remove('trigger_btn_pause')

    clearTimeout(playID)
  }
}