"use strict"

const player = document.querySelector('.player video')
const playButton = document.querySelector('.player_button_play-pause')
const overlayButton = document.querySelector('.player_button_overlay')
const progressBar = document.querySelector('.player_progress')
const fullscreenButton = document.querySelector('.player_button_fullscreen')

overlayButton.onclick = playButton.onclick = togglePlay
fullscreenButton.onclick = toggleFullscreen
player.ontimeupdate = updateProgress

function togglePlay() {
  if (player.paused) {
    player.play()
    overlayButton.dataset.state = playButton.dataset.state = 'pause'
  } else {
    player.pause()
    overlayButton.dataset.state = playButton.dataset.state = 'play'
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen()
      .then(() => {
        fullscreenButton.dataset.state = 'exit-fullscreen'
      })
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
        .then(() => {
          fullscreenButton.dataset.state = 'go-fullscreen'
        })
    }
  }
}

function updateProgress() {
  progressBar.style.width = `${100 * player.currentTime / player.duration}%`

  if (player.ended) {
    overlayButton.dataset.state = playButton.dataset.state = 'play'
  }
}