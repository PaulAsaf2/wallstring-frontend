export function voiceHandle(target) {
  let startPlayPromise = new Audio(`../sounds/${target.charAt(0)}.mp3`)
  
  if (startPlayPromise !== undefined) {
    startPlayPromise.play()
      .then(() => alert(`play() is success!`))
      .catch((err) => alert(err))
  }
}