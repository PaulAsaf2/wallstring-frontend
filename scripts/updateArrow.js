import { point, arrow } from '../utils/constants.js'

export function updateArrowDirection() {
  const smallArrow = point.source.nextElementSibling;
  const allSmallArrows = Array.from(document.querySelectorAll('.small_arrow'))
  let s = point.source.textContent.charAt(0).toLowerCase()
  let t = point.target.textContent.charAt(0).toLowerCase()

  arrow.classList.remove(arrow.classList[1])
  allSmallArrows.forEach(arrow => arrow.classList.remove('show_arrow'))

  if (s == t) {
    smallArrow.classList.add('show_arrow')
  } else {
    arrow.classList.add(`arrow_${s}-${t}`)
  }
}