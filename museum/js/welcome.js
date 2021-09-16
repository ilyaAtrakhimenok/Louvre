let slider = document.querySelector(".welcome__slider");
let counter = document.querySelector(".welcome__slider-counter");
let leftArrow = document.querySelector(".welcome__arrow-left");
let rightArrow = document.querySelector(".welcome__arrow-right");
let welcomeInner = document.querySelector(".welcome-inner");
let squares = document.querySelectorAll(".slider-square");
let welcomeImgs = document.querySelectorAll(".welcome__img");
let imgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let timerId = null;
let leftX,
  rightX = 0;
function findActiveIndex(arr, classActive) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(classActive)) {
      return i;
    }
  }
}
function changeCounter() {
  counter.innerHTML = `0${findActiveIndex(squares, "active-square") + 1} | 05`;
}
function changeImg(direction) {
  clearTimeout(timerId);
  let activeIndex = findActiveIndex(squares, "active-square");
  if (window.innerWidth > 768) {
    welcomeInner.style.backgroundImage = `url(/museum/assets/img/welcome-slider/${imgs[activeIndex]})`;
    if (direction == "left") {
      welcomeInner.animate(
        [
          { backgroundPositionX: `${welcomeInner.clientWidth}px` },
          { backgroundPositionX: "100%" },
        ],
        {
          duration: 700,
          easing: "ease-in-out",
        }
      );
    } else {
      welcomeInner.animate(
        [
          { backgroundPositionX: `-${window.innerWidth / 2.7}px` },
          { backgroundPositionX: "100%" },
        ],
        {
          duration: 800,
          easing: "ease-in-out",
        }
      );
    }
  }
  else{
    let activeIndexImg = findActiveIndex(welcomeImgs, "welcome__active");
    welcomeImgs[activeIndexImg].classList.remove('welcome__active');
    welcomeImgs[activeIndex].classList.add('welcome__active');

    if (direction == "left") {
      welcomeImgs[activeIndex].animate(
        [
          { transform: `translateX(100%)` },
          { transform: "translateX(0)" },
        ],
        {
          duration: 700,
          easing: "ease-in-out",
        }
      );
    } else {
      welcomeImgs[activeIndex].animate(
        [
          { transform: `translateX(-100%)` },
          { transform: "translateX(0)" },
        ],
        {
          duration: 700,
          easing: "ease-in-out",
        }
      );
    }
  }
}
function moveNext() {
  let activeIndex = findActiveIndex(squares, "active-square");

  if (activeIndex == squares.length - 1) {
    squares[activeIndex].classList.remove("active-square");
    squares[0].classList.add("active-square");
  } else {
    squares[activeIndex].classList.remove("active-square");
    squares[activeIndex + 1].classList.add("active-square");
  }
  changeCounter();
  changeImg("right");
}
function movePrev() {
  let activeIndex = findActiveIndex(squares, "active-square");

  if (activeIndex == 0) {
    squares[activeIndex].classList.remove("active-square");
    squares[squares.length - 1].classList.add("active-square");
  } else {
    squares[activeIndex].classList.remove("active-square");
    squares[activeIndex - 1].classList.add("active-square");
  }
  changeCounter();
  changeImg("left");
}

function changeActiveElement(elem) {
  let direct = null;
  let activeIndex = findActiveIndex(squares, "active-square");
  squares[activeIndex].classList.remove("active-square");
  elem.classList.add("active-square");
  direct = activeIndex - findActiveIndex(squares, "active-square");
  if (direct > 0) changeImg("left");
  else changeImg("right");
  changeCounter();
}
function controlShadow() {
  if (window.innerWidth > 1500)
    welcomeInner.style.boxShadow = `inset ${500}px 0px 100px 0px rgba(0, 0, 0, 1)`;
  else if (window.innerWidth > 768) {
    welcomeInner.style.boxShadow = `inset ${
      window.innerWidth / 3
    }px 0px 100px 0px rgba(0, 0, 0, 1)`;
  } else {
    welcomeInner.style.boxShadow = `none`;
  }
}
function mouseDown(event) {
  document.body.style.cursor = "grab";
  leftX = event.clientX;
}
function mouseUp(event) {
  document.body.style.cursor = "default";
  rightX = event.clientX;
  if (leftX - rightX > 200) movePrev();
  else if (rightX - leftX > 200) moveNext();
}
controlShadow();
window.addEventListener("resize", controlShadow);
rightArrow.addEventListener("click", moveNext);
leftArrow.addEventListener("click", movePrev);
welcomeInner.addEventListener("mousedown", mouseDown);
welcomeInner.addEventListener("mouseup", mouseUp);
