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
function masn() {
  var elem = document.querySelector(".picture-inner-container");
  if (window.innerWidth > 800) {
    var msnry = new Masonry(elem, {
      itemSelector: ".gallery__img",
      columnWidth: picture.clientWidth / 3,
      horizontalOrder: true,
    });
    for(let i = 0; i < picAll.length; i++){
      picAll[i].width =picture.clientWidth / 3 - 36;
    }
  } else {
    var msnry = new Masonry(elem, {
      itemSelector: ".gallery__img",
      columnWidth: picture.clientWidth / 2,
      horizontalOrder: true,
    });
   for(let i = 0; i < picAll.length; i++){
     picAll[i].width = picture.clientWidth / 2 - 16;
   }
  }

}

shuffle(galleryImgs);

for (let i = 0; i < picAll.length; i++) {
  picAll[i].src = `assets/img/galery/${galleryImgs[i]}`;
}
picAll[0].style.marginTop = "50px";
picAll[10].style.marginTop = "50px";
masn();
window.addEventListener('resize', masn);


