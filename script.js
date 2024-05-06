const sliderEl = document.querySelector("#range")
const popup = document.querySelector('.popup_dont_worry')
const meditationBtn = document.querySelector('.meditaion_btn_off')
const meditationText = document.querySelector('.meditation_text')
const playBtn = document.querySelector('.trigger_btn')
const pointA = document.getElementById('point-a')
const pointB = document.getElementById('point-b')
const pointC = document.getElementById('point-c')
const pointD = document.getElementById('point-d')
// const points = ['A9', 'D45', 'C13', 'B46', 'C23', 'D39', 'A32', 'B19', 'A31', 'D29', 'A25', 'D18', 'C37', 'B31', 'C17', 'B41', 'A30', 'B29', 'C41', 'D34', 'C34', 'D32', 'C36', 'D24', 'A39', 'D23', 'A41', 'B52', 'C12', 'D56', 'C11', 'D55', 'C9', 'D52', 'C7', 'D51', 'A6', 'B56', 'A4', 'B8', 'A44', 'B30', 'C28', 'B40', 'A43', 'D26', 'C45', 'D17', 'C51', 'D14', 'C44', 'D31', 'A27', 'B21', 'A51', 'D42', 'C24', 'D21', 'C42', 'B43', 'C16', 'D49', 'C18', 'B35', 'C33', 'B23', 'A13', 'B29', 'C30', 'B25', 'C36', 'D22', 'C39', 'D39', 'A17', 'D43', 'A24', 'B45', 'C28', 'D31', 'A28', 'B40', 'A33', 'B17', 'B1', 'C6', 'B46', 'A26', 'D32', 'A36', 'B11', 'C10', 'D54', 'C11', 'B55', 'A46', 'B3', 'D58', 'C2', 'A1']
const points = ['A9', 'C13', 'D45',  'B46', 'C20']
const tg = window.Telegram.WebApp
const arrow = document.querySelector('.arrow')
let source, target, s, t, count //s,t - first letter of point e.g. A or C etc.
let playID = null
count = 0

tg.expand()

source = pointB
source.textContent = 'B31'
source.classList.add('point-b')

sliderEl.addEventListener("input", (event) => {
  let sliderValue = event.target.value;
  let percent = (sliderValue == 2) ? 25
    : (sliderValue == 3) ? 50
      : (sliderValue == 4) ? 75
        : (sliderValue == 5) ? 100
          : 0;

  sliderEl.style.background = `
    linear-gradient(to right, #5C52C0 ${percent}%, #F1F0F2 ${percent}%)`;
})

function closePopup() {
  popup.classList.add('popup_dont_worry_close')
}

function toggleMeditation() {
  meditationBtn.classList.toggle('meditaion_btn_on')
  meditationText.classList.toggle('meditation_text_show')
}

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
  
  s = source.textContent.charAt(0).toLowerCase()
  t = target.textContent.charAt(0).toLowerCase()

  arrow.classList.add(`arrow_${s}-${t}`)
}

function togglePlay() {
  if (!playBtn.classList.contains('trigger_btn_pause')) {
    playBtn.classList.add('trigger_btn_pause')
    playBtn.textContent = 'Пауза'

    playbackHandling()

    playID = setTimeout(function play() {
      count++
      if (!points[count]) return

      source.classList.remove(`point-${s}`)
      arrow.classList.remove(arrow.classList[1])

      source = target
      target = points[count]

      playbackHandling()

      playID = setTimeout(play, 1000)
    }, 1000)
  } else {
    playBtn.textContent = 'Старт'
    playBtn.classList.remove('trigger_btn_pause')

    clearTimeout(playID)
  }
}

playBtn.addEventListener('click', togglePlay)
meditationBtn.addEventListener('click', toggleMeditation)