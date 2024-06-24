import { detectSounds, delay, /*points,*/ point } from '../utils/constants.js'

let sound = new Howl({
  src: ['./audio/wallstingpoints.mp3'],
  sprite: detectSounds,
})

export function playSound() {
  let letter = point.array[point.index].charAt(0)
  let number = point.array[point.index].slice(1)

  sound.play(letter)
  setTimeout(() => sound.play(number), delay.insidePoint)
}