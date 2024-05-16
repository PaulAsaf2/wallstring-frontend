const audioFiles = {}

document.querySelectorAll('[id^="audio"]').forEach(audio => {
  audioFiles[audio.id.replace('audio', '')] = audio
})

function playSound(letOrNum) {
  let audio = audioFiles[letOrNum]
  if (audio) {
    audio.muted = false
    return audio.play()
  } else {
    return Promise.reject(`Audio file for ${letOrNum} not found`)
  }
}

export function soundHandle(target) {
  let letter = target.textContent.substring(0, 1)
  let number = target.textContent.substring(1)

  playSound(letter)
    .then(() => new Promise((resolve, reject) => {
      setTimeout(() => {
        playSound(number).then(resolve).catch(reject)
      }, 300)
    }))
    .catch(error => alert(`При воспроизведении точки ${letter}${number} произошла ошибка: ${error}.`))
}

export function prepareAudioFiles() {
  const audioPromises = Object.values(audioFiles).map(audio => {
    audio.muted = true
    return audio.play()
      .then(() => {
        audio.pause()
        audio.currentTime = 0
      })
      .catch(error => alert(`Ошибка в подготовке звукогого файла (${audio.id}): ${error}`))
  })

  return Promise.all(audioPromises)
}