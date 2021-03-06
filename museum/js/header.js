let burger = document.getElementById("header__burger");
let cancel = document.getElementById("header__cancel");
let nav = document.querySelector(".header__nav");
let text = document.querySelector(".welcome__text");
let menuItems = document.querySelectorAll(".header__item");
let headerConatcts = document.querySelector(".header__contacts");
let headerImgs = document.querySelector(".header__imgs");
let headerInner = document.querySelector(".header-inner");
let innerHeight = window.innerHeight;
let isFinish = true;

async function showMenu() {
  if (isFinish) {
    isFinish = false;
    if (window.innerWidth > 768) {
      burger.style.display = "none";
      cancel.style.display = "block";
      text.style.display = "none";
      nav.style.display = "block";
      for (let i = 0; i < menuItems.length; i++) {
        await delay(220).then(() => {
          menuItems[i].style.display = "block";
          menuItems[i].animate(
            [
              { transform: "translateX(-100%)" },
              { transform: "translateX(0)" },
            ],
            { duration: 220 }
          );
        });
      }
    } else {
      burger.style.display = "none";
      cancel.style.display = "block";
      headerConatcts.style.display = "flex";
      headerInner.style.display = "grid";
      headerImgs.style.display = "grid";
      nav.style.display = "block";
      for (let i = 0; i < menuItems.length; i++) {
        await delay(220).then(() => {
          menuItems[i].style.display = "block";
          menuItems[i].animate(
            [
              { transform: "translateX(-100%)" },
              { transform: "translateX(0)" },
            ],
            { duration: 220 }
          );
        });
      }
    }
    isFinish = true;
  }
}
async function cancelMenu() {
  if (isFinish) {
    isFinish = false;
    await smoothlyHideNav();
    if (window.innerWidth > 768) {
      await delay(500).then(() => {
        text.style.display = "block";
        text.animate([{ opacity: "0" }, { opacity: "100%" }], {
          duration: 500,
          easing: "ease-in-out",
        });
      });
    } else {
      headerConatcts.style.display = "none";
      headerInner.style.display = "flex";
      headerImgs.style.display = "none"; 
    }
    hideMenu();
    isFinish = true;
  }
}
async function smoothlyHideNav() {
  for (let i = 0; i < menuItems.length; i++) {
    await delay(220).then(() => {
      menuItems[i].animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
        { duration: 220 }
      );
      menuItems[i].style.transform = "translateX(-200%)";
    });
  }
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function hideMenu() {
  nav.style.display = "none";
  cancel.style.display = "none";
  burger.style.display = "block";
  text.style.display = "block";
  menuItems.forEach((item) => {
    item.style.display = "none";
    item.style.transform = "translateX(0)";
  });
}
function changeAdaptive() {
  if (window.innerWidth > 1024) {
    nav.style.display = "block";
    burger.style.display = "none";
    cancel.style.display = "none";
    menuItems.forEach((item) => {
      item.style.display = "block";
    });
  } else {
    hideMenu();
  }
  isFinish = true;
}
window.addEventListener("click", function (event) {
  if (
    nav.style.display == "block" &&
    event.target.className != "header__item" &&
    event.target.className != "fas fa-bars" &&
    window.innerWidth <= 1024
  ) {
    cancelMenu();
  }
});
window.addEventListener("resize", () => {
  if(window.innerWidth > 520)
    changeAdaptive();
});
cancel.addEventListener("click", cancelMenu);
burger.addEventListener("click", showMenu);
