export function voiceHandle(target) {
  let letterAudio = new Audio(`../sounds/${target.charAt(0)}.mp3`)
  let numberAudio = new Audio(`../sounds/${target.slice(1)}.mp3`)

  letterAudio.play()
  setTimeout(() => numberAudio.play(), 300)

}