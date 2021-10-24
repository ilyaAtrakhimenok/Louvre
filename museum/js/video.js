let volume = document.getElementById("volume");
let progress = document.getElementById("progress");
let video = document.querySelector(".video__movie");
let toggleBtn = document.querySelector(".play-pause");
let volumeBtn = document.querySelector(".volume");
let screenBtn = document.querySelector(".fullScreen");
let player = document.querySelector(".player__video");
let controls = document.querySelector(".player__controls");
let plusFive = document.querySelector(".plusFive");
let minusFive = document.querySelector(".minusFive");
let speed = document.querySelector(".speed");
let videoPlayBtn = document.querySelector(".video__play__img");
let videoBlock = document.getElementById("video");
let timeoutMouseMove = null;
let timeoutSpeed = null;

function changeRangeProgress(range) {
  if (range == "volume") {
    if (volume.value == 0)
      volumeBtn.firstElementChild.className = "fas fa-volume-mute";
    else volumeBtn.firstElementChild.className = "fas fa-volume-up";
    let val = volume.value;
    volume.style.background =
      "-webkit-linear-gradient(left,#710707 0%, #710707 " +
      val +
      "%, white " +
      val +
      "%, white 100%)";
    video.volume = val / 100;
  } else if (range == "progress") {
    let val = progress.value;
    progress.style.background =
      "-webkit-linear-gradient(left,#710707 0%, #710707 " +
      val +
      "%, white " +
      val +
      "%, white 100%)";
  }
}
function toggleSwitcher() {
  if (video.paused) {
    video.play();
    toggleBtn.innerHTML = "❚❚";
    videoPlayBtn.style.display = "none";
    stopYouTube();
  } else {
    video.pause();
    toggleBtn.firstChild.remove();
    toggleBtn.insertAdjacentHTML('beforeend','<i class="fas fa-play"></i>');
    videoPlayBtn.style.display = "block";
  }
}
function playProc() {
  let val = Math.ceil((video.currentTime / video.duration) * 100);
  if (progress.value - val > 2 || progress.value - val < -2) {
    val = progress.value;
    video.currentTime = (val * video.duration) / 100;
  }
  if (!val) progress.value = 0;
  else progress.value = val;
  progress.style.background =
    "-webkit-linear-gradient(left,#710707 0%, #710707 " +
    val +
    "%, white " +
    val +
    "%, white 100%)";
}
function changeScreenMode() {
  let elem = document.fullscreenElement;
  if (player != elem) {
    player.requestFullscreen();
    screenBtn.firstElementChild.className = "fas fa-compress-arrows-alt";
  } else {
    document.exitFullscreen();
    screenBtn.firstElementChild.className = "fas fa-expand";
  }
}
function hideControls() {
  clearTimeout(timeoutMouseMove);
  timeoutMouseMove = setTimeout(function () {
    controls.style.transform = "translateY(120%)";
  }, 7000);
  controls.style.transform = "translateY(0)";
}
function changeVolume() {
  if (video.volume != 0) {
    volumeBtn.firstElementChild.className = "fas fa-volume-mute";
    volume.value = 0;
    changeRangeProgress("volume");
  } else {
    volumeBtn.firstElementChild.className = "fas fa-volume-up";
    volume.value = 50;
    changeRangeProgress("volume");
  }
}
function procKeyPress(key) {
  if (window.pageYOffset >= videoBlock.offsetTop - 100 && window.pageYOffset < videoBlock.offsetTop + videoBlock.getBoundingClientRect().height) {
    let keyCode = key.code.toString();
    switch (keyCode) {
      case "Space":
        key.preventDefault();
        toggleSwitcher();
        break;
      case "Period":
        if (video.playbackRate < 2) {
          clearTimeout(timeoutSpeed);
          video.playbackRate += 0.25;
          speed.innerHTML = `${video.playbackRate}x`;
          speed.style.opacity = "100%";
          timeoutSpeed = setTimeout(() => {
            speed.style.opacity = "0";
          }, 2000);
        }
        break;
      case "Comma":
        if (video.playbackRate > 0.25) {
          clearTimeout(timeoutSpeed);
          video.playbackRate -= 0.25;
          speed.innerHTML = `${video.playbackRate}x`;
          speed.style.opacity = "100%";
          timeoutSpeed = setTimeout(() => {
            speed.style.opacity = "0";
          }, 2000);
        }
        break;
      case "KeyM":
        changeVolume();
        break;
      case "KeyF":
        changeScreenMode();
        break;
      case "ArrowRight":
        video.currentTime += 5;
        let valPlus = Math.ceil((video.currentTime / video.duration) * 100);
        progress.value = valPlus;
        plusFive.style.opacity = "100%";
        setTimeout(() => {
          plusFive.style.opacity = "0";
        }, 1400);
        break;
      case "ArrowLeft":
        video.currentTime -= 5;
        let valMinus = Math.ceil((video.currentTime / video.duration) * 100);
        progress.value = valMinus;
        minusFive.style.opacity = "100%";
        setTimeout(() => {
          minusFive.style.opacity = "0";
        }, 1400);
        break;
    }
  }
}
videoPlayBtn.addEventListener("mouseover", () => {
  videoPlayBtn.src = "assets/svg/play__center_hover.svg";
});
videoPlayBtn.addEventListener("mouseout", () => {
  videoPlayBtn.src = "assets/svg/play__center.svg";
});
progress.addEventListener("mousemove", () => changeRangeProgress("progress"));
video.addEventListener("timeupdate", playProc);
volume.addEventListener("mousemove", () => changeRangeProgress("volume"));
toggleBtn.addEventListener("click", toggleSwitcher);
video.addEventListener("ended", () => {
  toggleBtn.insertAdjacentHTML('beforeend','<i class="fas fa-play"></i>');
  controls.style.transform = "translateY(0)";
  video.load();
  progress.value = 0;
  changeRangeProgress("progress");
});
screenBtn.addEventListener("click", changeScreenMode);
document.addEventListener("fullscreenchange", function () {
  if (player != document.fullscreenElement) {
    screenBtn.firstElementChild.className = "fas fa-expand";
  }
});
video.addEventListener("mousemove", hideControls);
video.addEventListener("click", () => {
  toggleSwitcher();
});
volumeBtn.addEventListener("click", changeVolume);
document.addEventListener("keydown", procKeyPress);
videoPlayBtn.addEventListener("click", toggleSwitcher);
volume.addEventListener('touchmove', () => changeRangeProgress("volume"), false);
progress.addEventListener('touchmove', () => changeRangeProgress("volume"), false);
