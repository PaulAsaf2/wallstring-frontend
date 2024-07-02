import {
  errorPopup, errorTitle, errorSubtitle, iconProcess,
  iconWarning, testCont, testText, test,
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

export function countdown(seconds) {
  let currentSeconds = seconds

  console.log(currentSeconds);

  testText.textContent = 'До ошибки сервера осталось ' + currentSeconds + ' сек'

  let interval = setInterval(function() {
    currentSeconds--

    console.log(currentSeconds);
    testText.textContent = 'До ошибки сервера осталось ' + currentSeconds + ' сек'

    if (currentSeconds <= 0) {
      clearInterval(interval)
      console.log("Обратный отсчёт завершён");
      test.test = false
      testText.textContent = ''
    }
  }, 1000)
}