import { tg, meditationBtn, settingBtn, } from './constants.js'

export function setColorStyle() {
  if (tg.colorScheme === 'dark') {
    meditationBtn.classList.add('square_btn_dark')
    meditationBtn.classList.add('meditation_btn_dark')
    settingBtn.classList.add('square_btn_dark')
    settingBtn.classList.add('setting_btn_dark')
  } else {
    meditationBtn.classList.remove('square_btn_dark')
    meditationBtn.classList.remove('meditation_btn_dark')
    settingBtn.classList.remove('square_btn_dark')
    settingBtn.classList.remove('setting_btn_dark')
  }
}