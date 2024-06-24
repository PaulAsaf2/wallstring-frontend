import { progBar, stepCount/*, points*/, point } from '../utils/constants.js'

stepCount.textContent = `ШАГ 0 из ${point.array.length}`

export function updateProgressBar(index, length) {
  let percent = Math.round(index / length * 100)

  progBar.style.background = `
    linear-gradient(to right, #28C76F ${percent}%, #F1F0F2 ${percent}%)`;

  stepCount.textContent = `ШАГ ${index} из ${point.array.length}`
}