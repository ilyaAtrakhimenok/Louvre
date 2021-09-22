let exploreSlider = document.querySelector(".explore__slider");
let afterImg = document.querySelector(".explore__img-after");
let beforeImg = document.querySelector(".explore__img-before");
let exploreRange = document.querySelector(".explore__range");
let isMove = false;
let pos = exploreSlider.getBoundingClientRect();
function resizeExplore() {
  console.log('here')
  afterImg.style.clip = `rect(0,${beforeImg.clientWidth / 2}px,${
    exploreSlider.clientHeight
  }px,0)`;
  exploreRange.style.left = `${exploreSlider.clientWidth / 2 - 20}px`;
  exploreRange.style.height = `${afterImg.clientHeight}px`;
  exploreRange.firstElementChild.style.height = `${exploreSlider.clientHeight}px`;
}

function grabRange() {
  isMove = true;
}
function freeRange() {
  isMove = false;
}
function posImg(e) {
  if (e.clientX - pos.x > 0 && e.clientX - pos.x < pos.width && isMove) {
    exploreRange.style.left = `${e.clientX - pos.x - 20}px`;
    afterImg.style.clip = `rect(0,${e.clientX - pos.x}px,${
      exploreSlider.clientHeight
    }px,0)`;
  }
}
resizeExplore();
window.addEventListener('resize',resizeExplore);
exploreSlider.addEventListener("mousemove", posImg);
exploreRange.addEventListener("mousedown", grabRange);
exploreRange.addEventListener("mouseup", freeRange);
