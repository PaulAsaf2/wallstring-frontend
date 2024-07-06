const popup = document.querySelector('.popup_fullwidth')
const errorPopup = document.querySelector('.popup_fullwidth_error')
const errorTitle = document.querySelector('.error_title')
const errorSubtitle = document.querySelector('.error_subtitle')
const iconProcess = document.querySelector('.icon_process')
const iconWarning = document.querySelector('.icon_warning')
const meditationBtn = document.querySelector('.meditaion_btn_off')
const meditationText = document.querySelector('.meditation_text')
const closePopupBtn = document.querySelector('.close_popup_btn')
const playBtn = document.querySelector('.trigger_btn')
const sliderEl = document.querySelector("#range")
const arrow = document.querySelector('.big_arrow')
const progBar = document.querySelector('.progress-bar')
const stepCount = document.querySelector('.step')
const initialDescription = document.querySelector('.description')
const descriptionCloseBtn = document.querySelector('.description_close')

const tg = window.Telegram.WebApp
const delay = {
  betweenPoints: 1000,
  insidePoint: 300,
}
const point = {
  index: 0,
  currentStep: 0,
  array: '',
  initial: false,
  A: document.getElementById('point-a'),
  B: document.getElementById('point-b'),
  C: document.getElementById('point-c'),
  D: document.getElementById('point-d'),
  A2: document.getElementById('second-a'),
  B2: document.getElementById('second-b'),
  C2: document.getElementById('second-c'),
  D2: document.getElementById('second-d'),
  source: null,
  target: null,
}
const knitting = {
  play: false,
  end: false,
  id: '',
}
const knittingUrl = 'https://pin.sourctech.ru/telegram/string/'
const user = {
  tgId: null,
  promocode: null,
}
const test = {
  test: true,
}
const detectSounds = {
  A: [0, 580],
  B: [470, 580],
  C: [1055, 645],
  D: [1700, 600],
  1: [2270, 760],
  2: [3000, 760],
  3: [3730, 610],
  4: [4280, 1000],
  5: [5210, 790],
  6: [6000, 900],
  7: [6870, 890],
  8: [7670, 880],
  9: [8570, 890],
  10: [9430, 970],
  11: [10330, 1220],
  12: [11520, 1240],
  13: [12750, 1160],
  14: [13920, 1300],
  15: [15220, 1150],
  16: [16350, 1170],
  17: [17520, 1150],
  18: [18650, 1300],
  19: [19950, 1300],
  20: [21210, 990],
  21: [22190, 1150],
  22: [23300, 1110],
  23: [24360, 1130],
  24: [25440, 1300],
  25: [26680, 1270],
  26: [27900, 1330],
  27: [29190, 1180],
  28: [30340, 1260],
  29: [31530, 1320],
  30: [32770, 1050],
  31: [33760, 1160],
  32: [34890, 1030],
  33: [35870, 1090],
  34: [36900, 1380],
  35: [38180, 1390],
  36: [39540, 1290],
  37: [40780, 1200],
  38: [41920, 1320],
  39: [43180, 1330],
  40: [44450, 1080],
  41: [45500, 1450],
  42: [46880, 1270],
  43: [48110, 1280],
  44: [49320, 1400],
  45: [50680, 1220],
  46: [51850, 1430],
  47: [53200, 1260],
  48: [54440, 1390],
  49: [55770, 1320],
  50: [57030, 1070],
  51: [58050, 1280],
  52: [59290, 1220],
  53: [60440, 1320],
  54: [61670, 1310],
  55: [62950, 1310],
  56: [64220, 1390],
  57: [65550, 1270],
  58: [66790, 1280],
  59: [68020, 1430],
  60: [69360, 1140],
}
export {
  popup,
  meditationBtn,
  meditationText,
  playBtn,
  closePopupBtn,
  delay,
  sliderEl,
  arrow,
  detectSounds,
  progBar,
  stepCount,
  point,
  initialDescription,
  descriptionCloseBtn,
  knittingUrl,
  tg,
  user,
  knitting,
  errorPopup,
  errorTitle,
  errorSubtitle,
  iconProcess,
  iconWarning,
  test,
}