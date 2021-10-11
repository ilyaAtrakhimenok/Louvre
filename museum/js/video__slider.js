let sliders = document.querySelectorAll(".item");
let dots = document.querySelectorAll(".slider-dot");
let leftArrowVideo = document.querySelector(".left-arrow");
let rightArrowVideo = document.querySelector(".right-arrow");
let movie = document.querySelector(".video__movie");
let progRange = document.querySelector(".progress-range");
let firstVideo = document.getElementById("first__video");
let videoWidth = 450;
let videos = [
  "assets/video/video.mp4",
  "assets/video/video1.mp4",
  "assets/video/video2.mp4",
  "assets/video/video3.mp4",
  "assets/video/video4.mp4",
];
let posters = [
  "assets/video/poster0.jpg",
  "assets/video/poster1.jpg",
  "assets/video/poster2.jpg",
  "assets/video/poster3.jpg",
  "assets/video/poster4.jpg",
];
function changeVideo() {
  movie.src = videos[findActiveIndex(sliders, "active")];
  movie.poster = posters[findActiveIndex(sliders, "active")];
  progRange.value = 0;
  changeRangeProgress("progress");
  toggleBtn.innerHTML = "►";
}
function findActiveIndex(arr, classActive) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(classActive)) {
      return i;
    }
  }
}

function moveNext() {
  let activeIndex = findActiveIndex(sliders, "active");

  if (activeIndex == sliders.length - 1) {
    sliders[activeIndex].classList.remove("active");
    sliders[0].classList.add("active");

    dots[activeIndex].classList.remove("active-dot");
    dots[0].classList.add("active-dot");
    hideSliders(0);
  } else {
    sliders[activeIndex].classList.remove("active");
    sliders[activeIndex + 1].classList.add("active");

    dots[activeIndex].classList.remove("active-dot");
    dots[activeIndex + 1].classList.add("active-dot");
    hideSliders(activeIndex + 1);
  }
  changeVideo();
}
function movePrev() {
  let activeIndex = findActiveIndex(sliders, "active");

  if (activeIndex == 0) {
    sliders[activeIndex].classList.remove("active");
    sliders[sliders.length - 1].classList.add("active");

    dots[activeIndex].classList.remove("active-dot");
    dots[sliders.length - 1].classList.add("active-dot");
    hideSliders(sliders.length - 1);
  } else {
    sliders[activeIndex].classList.remove("active");
    sliders[activeIndex - 1].classList.add("active");

    dots[activeIndex].classList.remove("active-dot");
    dots[activeIndex - 1].classList.add("active-dot");
    hideSliders(activeIndex - 1);
  }
  changeVideo();
}

function changeActiveElementDot(elem) {
  let activeIndex = findActiveIndex(dots, "active-dot");
  dots[activeIndex].classList.remove("active-dot");
  elem.classList.add("active-dot");
  activeIndex = findActiveIndex(sliders, "active");
  sliders[activeIndex].classList.remove("active");
  activeIndex = findActiveIndex(dots, "active-dot");
  sliders[activeIndex].classList.add("active");
  hideSliders(activeIndex);
  changeVideo();
}
function changeActiveElementImg(elem) {
  // let activeIndex = findActiveIndex(sliders, "active");
  // sliders[activeIndex].classList.remove("active");
  // elem.parentElement.classList.add("active");

  // activeIndex = findActiveIndex(dots, "active-dot");
  // dots[activeIndex].classList.remove("active-dot");
  // activeIndex = findActiveIndex(sliders, "active");
  // dots[activeIndex].classList.add("active-dot");
  // changeVideo();
}
function hideSliders(activeIndex) {
  if (movie.clientWidth > 768) {
    if (activeIndex == 0) {
      for (let i = 0; i < sliders.length; i++) {
        if (i != activeIndex && i != activeIndex + 1 && i != activeIndex + 2) {
          sliders[i].style.display = "none";
        } else {
          sliders[i].style.display = "block";
        }
      }
    } else if (activeIndex == sliders.length - 1) {
      for (let i = 0; i < sliders.length; i++) {
        if (i != activeIndex && i != activeIndex - 1 && i != activeIndex - 2) {
          sliders[i].style.display = "none";
        } else {
          sliders[i].style.display = "block";
        }
      }
    } else {
      for (let i = 0; i < sliders.length; i++) {
        if (i != activeIndex && i != activeIndex + 1 && i != activeIndex - 1) {
          sliders[i].style.display = "none";
        } else {
          sliders[i].style.display = "block";
        }
      }
    }
  } else {
    if (activeIndex == 0) {
      for (let i = 0; i < sliders.length; i++) {
        if (i != activeIndex && i != activeIndex + 1) {
          sliders[i].style.display = "none";
        } else {
          sliders[i].style.display = "block";
        }
      }
    } else if (activeIndex == sliders.length - 1) {
      for (let i = 0; i < sliders.length; i++) {
        if (i != activeIndex && i != activeIndex - 1) {
          sliders[i].style.display = "none";
        } else {
          sliders[i].style.display = "block";
        }
      }
    } else {
      for (let i = 0; i < sliders.length; i++) {
        if (i != activeIndex && i != activeIndex + 1) {
          sliders[i].style.display = "none";
        } else {
          sliders[i].style.display = "block";
        }
      }
    }
  }
}
function resize() {
  if (movie.clientWidth > 768 && movie.clientWidth < 1480) {
    sliders.forEach((item) => {
      item.style.width = `${(movie.clientWidth * videoWidth) / 1480}px`;
      item.style.height = `${(parseInt(item.style.width) * 5) / 9}px`;
    });
  }
  if (movie.clientWidth > 480 && movie.clientWidth < 768) {
    sliders.forEach((item) => {
      item.style.width = `${(movie.clientWidth * (videoWidth - 90)) / 768}px`;
      item.style.height = `${(parseInt(item.style.width) * 5) / 9}px`;
    });
  }
  if (movie.clientWidth < 480) {
    sliders.forEach((item) => {
      item.style.width = `${(movie.clientWidth * (videoWidth - 220)) / 480}px`;
      item.style.height = `${(parseInt(item.style.width) * 5) / 9}px`;
    });
  }
  hideSliders(findActiveIndex(sliders, "active"));
}

resize();
hideSliders(findActiveIndex(sliders, "active"));
window.addEventListener("resize", resize);
rightArrowVideo.addEventListener("click", moveNext);
leftArrowVideo.addEventListener("click", movePrev);
