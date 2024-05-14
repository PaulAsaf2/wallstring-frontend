export function voiceHandle(target) {
  // let letterAudio = new Audio(`../sounds/${target.charAt(0)}.mp3`)
  // let numberAudio = new Audio(`../sounds/${target.slice(1)}.mp3`)
  
  // letterAudio.play()
  // setTimeout(() => numberAudio.play(), 300)

  if (target.charAt(0) == 'A') {
    let letterA = new Audio('../sounds/A.mp3')
    letterA.play()
  } else if (target.charAt(0) == 'B') {
    let letterB = new Audio('../sounds/B.mp3')
    letterB.play()
  } else if (target.charAt(0) == 'C') {
    let letterC = new Audio('../sounds/C.mp3')
    letterC.play()
  } else {
    let letterD = new Audio('../sounds/D.mp3')
    letterD.play()
  }

}