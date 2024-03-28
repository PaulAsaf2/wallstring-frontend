'use strict'

const sliderEl = document.querySelector("#range")
const popup = document.querySelector('.popup_dont_worry')
const meditationBtn = document.querySelector('.meditaion_btn_off')
const meditationText = document.querySelector('.meditation_text')
const playBtn = document.querySelector('.trigger_btn')
const targetPoint = document.querySelector('.target_point')

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

function togglePlay() {
  if (!playBtn.classList.contains('trigger_btn_pause')) {
    playBtn.textContent = 'Пауза'
  } else {
    playBtn.textContent = 'Начать'
  }

  playBtn.classList.toggle('trigger_btn_pause')
  targetPoint.classList.toggle('target_point_show')
}