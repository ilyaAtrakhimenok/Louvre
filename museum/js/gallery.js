let picture = document.querySelector(".picture-inner-container");
let picAll = document.querySelectorAll(".gallery__img");
let galleryImgs = [
  "galery1.jpg",
  "galery2.jpg",
  "galery3.jpg",
  "galery4.jpg",
  "galery5.jpg",
  "galery6.jpg",
  "galery7.jpg",
  "galery8.jpg",
  "galery9.jpg",
  "galery10.jpg",
  "galery11.jpg",
  "galery12.jpg",
  "galery13.jpg",
  "galery14.jpg",
  "galery15.jpg",
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function scrollGalleryAnimate(element) {
  element.forEach((item) => {
    let offsetBlock = window.pageYOffset + window.innerHeight,
      offsetImg = item.getBoundingClientRect().top + window.pageYOffset;
    if (offsetBlock >= offsetImg) {
      if (!item.classList.contains("animated")) {
        item.classList.add("animated");
      }
    } else {
      if (item.classList.contains("animated")) {
        item.classList.remove("animated");
      }
    }
  });
}

shuffle(galleryImgs);
for (let i = 0; i < picAll.length; i++) {
  picAll[i].src = `assets/img/galery/${galleryImgs[i]}`;
}
window.addEventListener("scroll", () => {
  scrollGalleryAnimate(picAll);
});
