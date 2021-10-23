let sliders = document.querySelectorAll(".swiper-slide");
let swiperSlide = document.querySelector(".swiper-wrapper")
let dots = document.querySelectorAll(".slider-dot");
let leftArrowVideo = document.querySelector(".swiper-button-next");
let rightArrowVideo = document.querySelector(".swiper-button-prev");
let pagination = document.querySelector(".swiper-pagination");
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
let youtube = [
  "https://www.youtube.com/embed/zp1BXPX8jcU",
  "https://www.youtube.com/embed/Vi5D6FKhRmo",
  "https://www.youtube.com/embed/NOhDysLnTvY",
  "https://www.youtube.com/embed/aWmJ5DgyWPI",
  "https://www.youtube.com/embed/2OR0OCr6uRE"
]
function changeVideo() {
  if(findActiveIndex(sliders, "swiper-slide-active") >= 0 ){
  movie.src = videos[findActiveIndex(sliders, "swiper-slide-active")];
  movie.poster = posters[findActiveIndex(sliders, "swiper-slide-active")];
  }
  else{
    movie.src = videos[findActiveIndex(sliders, "swiper-slide-duplicate-active")];
    movie.poster = posters[findActiveIndex(sliders, "swiper-slide-duplicate-active")];
  }
  progRange.value = 0;
  changeRangeProgress("progress");
  toggleBtn.innerHTML = "►";
  videoPlayBtn.style.display = 'block';
  stopYouTube();
}
function stopYouTube(){
  let videos = document.querySelectorAll('.playerYoutube');
  videos.forEach((item)=>{
    item.parentElement.querySelector('img').style.display = 'block';
    item.parentElement.querySelector('i').style.display = 'block';
    item.remove();
  })
}
function findActiveIndex(arr, classActive) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(classActive)) {
      return i;
    }
  }
}

function runYoutube(elem) {
  if(elem.target.className === 'fab fa-youtube'){
  stopYouTube();
  let height = swiperSlide.clientHeight;
  elem = elem.target;
  elem.parentElement.insertAdjacentHTML("beforeend", `<iframe class="playerYoutube" height=${height}px src=${youtube[elem.parentElement.dataset.swiperSlideIndex]} 
  title="YouTube video player" frameborder="0" allowfullscreen="1"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
  gyroscope; 
  picture-in-picture" allowfullscreen></iframe>`)
   
  elem.style.display = 'none';
  elem.previousElementSibling.style.display = 'none';
  }

}


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
centeredSlides: true,
speed: 600,
loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false,
    },
    769: {
        slidesPerView: 3,
        spaceBetween: 40,
    }
  }
});
swiperSlide.addEventListener('click', runYoutube);
pagination.addEventListener("click", changeVideo);
rightArrowVideo.addEventListener("click", changeVideo);
leftArrowVideo.addEventListener("click", changeVideo);
