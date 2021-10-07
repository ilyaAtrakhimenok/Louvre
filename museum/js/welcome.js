let slider = document.querySelector(".welcome__slider");
let counter = document.querySelector(".welcome__slider-counter");
let leftArrow = document.querySelector(".welcome__arrow-left");
let rightArrow = document.querySelector(".welcome__arrow-right");
let welcomeInner = document.querySelector(".welcome-inner");
let squares = document.querySelectorAll(".slider-square");
let welcomeImgs = document.querySelectorAll(".welcome__img");
let imgSlider = document.querySelector(".welcome__img-slider");
let imgWrapper = document.querySelector(".img-wrapper");
let imgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let mouseDownPos, mouseUpPos, xDown = null; 
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
function translateNext(activeIndex, activeIndexSwitch) {
  imgSlider.animate(
    [
      {
        transform: `translateX(-${
          welcomeImgs[0].clientWidth * (5 - welcomeImgs.length + activeIndex)
        }px)`,
      },
      {
        transform: `translateX(-${
          welcomeImgs[0].clientWidth *
          (5 - welcomeImgs.length + activeIndexSwitch)
        }px)`,
      },
    ],
    { duration: 520 }
  );
  imgSlider.style.transform = `translateX(-${
    welcomeImgs[0].clientWidth * (5 - welcomeImgs.length + activeIndexSwitch)
  }px)`;
}
function translatePrev(activeIndex, activeIndexSwitch) {
  imgSlider.animate(
    [
      {
        transform: `translateX(-${activeIndex * welcomeImgs[0].clientWidth}px)`,
      },
      {
        transform: `translateX(-${
          activeIndexSwitch * welcomeImgs[0].clientWidth
        }px`,
      },
    ],
    { duration: 520 }
  );
  imgSlider.style.transform = `translateX(-${
    activeIndexSwitch * welcomeImgs[0].clientWidth
  }px)`;
}
function moveRight() {
  console.log('next')
  let activeIndex = findActiveIndex(squares, "active-square");

  if (activeIndex == 0) {
    squares[activeIndex].classList.remove("active-square");
    squares[squares.length - 1].classList.add("active-square");
  } else {
    squares[activeIndex].classList.remove("active-square");
    squares[activeIndex - 1].classList.add("active-square");
  }
  let activeIndexSwitch = findActiveIndex(squares, "active-square");
  translateNext(activeIndex, activeIndexSwitch);
  changeCounter();
}
function moveLeft() {
  console.log("prev");
  let activeIndex = findActiveIndex(squares, "active-square");

  if (activeIndex == squares.length - 1) {
    squares[activeIndex].classList.remove("active-square");
    squares[0].classList.add("active-square");
  } else {
    squares[activeIndex].classList.remove("active-square");
    squares[activeIndex + 1].classList.add("active-square");
  }
  let activeIndexSwitch = findActiveIndex(squares, "active-square");
  translatePrev(activeIndex, activeIndexSwitch);
  changeCounter();
}

function changeActiveElement(elem) {
  let direct = null;
  let activeIndex = findActiveIndex(squares, "active-square");
  squares[activeIndex].classList.remove("active-square");
  elem.classList.add("active-square");
  direct = activeIndex - findActiveIndex(squares, "active-square");
  let activeIndexSwitch = findActiveIndex(squares, "active-square");
  if (direct > 0) {
    translatePrev(activeIndex, activeIndexSwitch);
  } else {
    translateNext(activeIndex, activeIndexSwitch);
  }
  changeCounter();
}
function controlSize() {
  if (window.innerWidth < 1440 && window.innerWidth > 768) {
    console.log("here", window.innerWidth);
    imgWrapper.style.width = `${window.innerWidth * 0.695}px`;
    imgWrapper.style.height = `${
      (750 * parseInt(imgWrapper.style.width)) / 1000
    }px`;
  } else if (window.innerWidth <= 768) {
    console.log("here 768", window.innerWidth, imgWrapper.clientWidth);
    imgWrapper.style.width = `100%`;
    imgWrapper.style.height = `${imgWrapper.clientWidth / 1.3}px`;
  }
}

function mouseDown(event) {
  welcomeInner.style.cursor = 'grab';
  mouseDownPos = event.pageX;
}
function mouseUp(event) {
  mouseUpPos = event.pageX;
  console.log(mouseDownPos - mouseUpPos);
  if(mouseDownPos - mouseUpPos > 100){
    moveLeft();
  }
  else if(mouseUpPos - mouseDownPos > 100){
    moveRight();
  }
  welcomeInner.style.cursor = 'default';
}
                                                       

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                                                        
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;                                    

    let xDiff = xDown - xUp;
                                                                         
    if ( Math.abs( xDiff)) {
        if ( xDiff > 0 ) {
          moveLeft();
        } else {
          moveRight();
        }                       
    }                                                                
    xDown = null;
    yDown = null;                                             
};
controlSize();
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener("resize", controlSize);
rightArrow.addEventListener("click", moveRight);
leftArrow.addEventListener("click", moveLeft);
welcomeInner.addEventListener("mousedown", mouseDown);
welcomeInner.addEventListener("mouseup", mouseUp);
