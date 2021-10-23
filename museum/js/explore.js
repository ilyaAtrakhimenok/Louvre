let exploreSlider = document.querySelector(".explore__slider");
let afterImg = document.querySelector(".explore__img-after");
let beforeImg = document.querySelector(".explore__img-before");
let exploreRange = document.querySelector(".explore__range");
let isMove = false;
let pos = exploreSlider.getBoundingClientRect();
let touchStart = 0;
let touchEnd = 0;
function resizeExplore() {
 
  afterImg.style.clip = `rect(0,${afterImg.clientWidth / 1.65}px,${
    exploreSlider.clientHeight
  }px,0)`;
  exploreRange.firstElementChild.style.height = `${exploreSlider.clientHeight}px`;
  exploreRange.style.height = `${afterImg.clientHeight}px`;
  if (window.innerWidth > 1024) {
    exploreRange.style.left = `${beforeImg.clientWidth / 1.65 - 15}px`;
  } else if (window.innerWidth > 520) {
    exploreRange.style.left = `${
      afterImg.clientWidth / 1.65 +
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 -
      15
    }px`;
  } else {
    exploreRange.style.left = `${
      afterImg.clientWidth / 1.65 +
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 -
      10
    }px`;
  }
}
function grabRange() {
  isMove = true;
}
function freeRange() {
  isMove = false;
}
function posImg(e) {
  if (
    e.clientX - pos.x > 0 &&
    e.clientX - pos.x <= pos.width &&
    isMove &&
    window.innerWidth > 1024
  ) {
    exploreRange.style.left = `${e.clientX - pos.x - 20}px`;
    afterImg.style.clip = `rect(0,${e.clientX - pos.x}px,${
      exploreSlider.clientHeight
    }px,0)`;
  } else if (
    e.clientX - pos.x >
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 &&
    e.clientX -
      pos.x +
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 <=
      pos.width &&
    isMove &&
    window.innerWidth > 520
  ) {
    exploreRange.style.left = `${e.clientX - pos.x - 20}px`;
    afterImg.style.clip = `rect(0,${
      e.clientX - pos.x - (exploreSlider.clientWidth - afterImg.clientWidth) / 2
    }px,${exploreSlider.clientHeight}px,0)`;
  } else if (
    e.clientX - pos.x >
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 + 10 &&
    e.clientX -
      pos.x +
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 -
      10 <=
      pos.width &&
    isMove &&
    window.innerWidth < 520
  ) {
    exploreRange.style.left = `${e.clientX - pos.x - 20}px`;
    afterImg.style.clip = `rect(0,${
      e.clientX -
      pos.x -
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 -
      10
    }px,${exploreSlider.clientHeight}px,0)`;
  }
}
function handleStart(evnt) {
  evnt.preventDefault();

  touchStart = evnt.touches[0].clientX;
}
function handleMove(evnt) {
  evnt.preventDefault();
  let rect = (exploreSlider.clientWidth - afterImg.clientWidth) / 2;
  if (
    evnt.touches[0].clientX >  rect + 10 &&
    evnt.touches[0].clientX -  pos.x +  rect - 10 > 0 &&
    evnt.touches[0].clientX -  pos.x + rect - 10 < pos.width
  ) {
    console.log( evnt.touches[0].clientX -  pos.x +  (exploreSlider.clientWidth - afterImg.clientWidth) / 2 - 10, pos.width);
    exploreRange.style.left = `${evnt.touches[0].clientX - pos.x - 20}px`;
    afterImg.style.clip = `rect(0,${
      evnt.touches[0].clientX -
      pos.x -
      (exploreSlider.clientWidth - afterImg.clientWidth) / 2 -
      10
    }px,${exploreSlider.clientHeight}px,0)`;
  }
}
resizeExplore();
window.addEventListener("resize", resizeExplore);
exploreSlider.addEventListener("mousemove", posImg);
exploreRange.addEventListener("mousedown", grabRange);
exploreRange.addEventListener("mouseup", freeRange);
exploreRange.addEventListener("touchstart", handleStart, false);
exploreSlider.addEventListener("touchmove", handleMove, false);
