const progBar = document.querySelector('.progress-bar')

export function progressBarHandle(index, length) {
  let percent = Math.round(index / length * 100)

  progBar.style.background = `
    linear-gradient(to right, #28C76F ${percent}%, #F1F0F2 ${percent}%)`;
}