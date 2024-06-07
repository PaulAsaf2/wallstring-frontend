import { point, points } from '../utils/constants.js'

function updateSourcePoint() {
  let sourceLetter = point.source.textContent.charAt(0)
  let targetLetter = point.target?.textContent.charAt(0)

  if (sourceLetter == targetLetter) {
    point.source.textContent = point.target?.textContent
  } else {
    point.source.classList.remove('show_point')
    point.source = point.target
  }
}

function updateTargetPoint() {
  let sourceLetter = point.source.textContent.charAt(0)
  let targetLetter = points[point.index].charAt(0)

  if (sourceLetter == targetLetter) {
    point.target = point[`${targetLetter}2`]
  } else {
    point.target = point[targetLetter]
    point[`${sourceLetter}2`].classList.remove('show_point')
  }

  point.target.textContent = points[point.index]
  point.target.classList.add(`show_point`)
}

export function updatePoints() {
  if (point.index > 0) updateSourcePoint()

  updateTargetPoint()
}