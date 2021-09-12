let slider = document.querySelector('.welcome__slider');
let counter = document.querySelector('.welcome__slider-counter');
let leftArrow = document.querySelector('.welcome__arrow-left');
let rightArrow = document.querySelector('.welcome__arrow-right');
let welcomeInner = document.querySelector('.welcome-inner');
let squares = document.querySelectorAll('.slider-square');
let imgs = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
let timerId = null;
function findActiveIndex(arr, classActive) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(classActive)) {
      return i;
    }
  }
}
function changeCounter(){
  counter.innerHTML = `0${findActiveIndex(squares,'active-square') + 1} | 05`
}
function changeImg(){
  clearTimeout(timerId);
  let activeIndex = findActiveIndex(squares,'active-square');
  welcomeInner.style.background = ` linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 30%,
    rgba(0, 0, 0, 0) 60%
  ),
  url(/assets/img/welcome-slider/${imgs[activeIndex]}) 100% 100% no-repeat`;
  welcomeInner.classList.add('run-animation');
  timerId = setTimeout(() => welcomeInner.classList.remove('run-animation'),700);

}
function moveNext() {
    console.log('next');
  let activeIndex = findActiveIndex(squares, "active-square");

  if (activeIndex == squares.length - 1) {
    squares[activeIndex].classList.remove("active-square");
    squares[0].classList.add("active-square");

  } else {
    squares[activeIndex].classList.remove("active-square");
    squares[activeIndex + 1].classList.add("active-square");
  }
  changeCounter();
  changeImg();
}
function movePrev() {
    console.log('prev');
  let activeIndex = findActiveIndex(squares, "active-square");

  if (activeIndex == 0) {
    squares[activeIndex].classList.remove("active-square");
    squares[squares.length - 1].classList.add("active-square");

  } else {
    squares[activeIndex].classList.remove("active-square");
    squares[activeIndex - 1].classList.add("active-square");
  }
  changeCounter();
  changeImg();
}

function changeActiveElement(elem) {
  let activeIndex = findActiveIndex(squares, "active-square");
  squares[activeIndex].classList.remove("active-square");
  elem.classList.add("active-square");
  changeCounter();
  changeImg();
}

rightArrow.addEventListener("click", moveNext);
leftArrow.addEventListener("click", movePrev);


