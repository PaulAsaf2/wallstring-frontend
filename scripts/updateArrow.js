import { point, arrow } from '../utils/constants.js'

const allSmallArrows = Array.from(document.querySelectorAll('.small_arrow'))

export function updateArrowDirection() {
  const smallArrow = point.source.nextElementSibling;
  
  let s = point.source.textContent.charAt(0).toLowerCase()
  let t = point.target.textContent.charAt(0).toLowerCase()

  resetArrows()

  if (s == t) {
    smallArrow.classList.add('show_arrow')
  } else {
    arrow.classList.add(`arrow_${s}-${t}`)
  }
}

export function resetArrows() {
  arrow.classList.remove(arrow.classList[1])
  allSmallArrows.forEach(arrow => arrow.classList.remove('show_arrow'))
}