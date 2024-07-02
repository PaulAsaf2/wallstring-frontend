import {
  errorPopup, errorTitle, errorSubtitle, iconProcess,
  iconWarning,
} from '../utils/constants.js'

export function showErrorMessage(title, subtitle, maxAttemts) {
  errorPopup.classList.add('popup_fullwidth_show')
  errorTitle.textContent = title
  errorSubtitle.textContent = subtitle

  if (maxAttemts) {
    iconProcess.style.display = 'none'
    iconWarning.style.display = 'block'
  } else {
    iconProcess.style.display = 'block'
    iconWarning.style.display = 'none'
  }
}