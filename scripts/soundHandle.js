import { detectSounds, delay } from '../utils/constants.js'

let sound = new Howl({
  src: ['./audio/wallstingpoints.mp3'],
  sprite: detectSounds,
})

export function playSound(letter, number) {
  sound.play(letter)
  setTimeout(() => sound.play(number), delay.insidePoint)
}