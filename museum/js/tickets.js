let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close");
let ticketsBtn = document.querySelector(".tickets__total-btn");
let inputBasic = document.querySelectorAll(".input-basic");
let inputSenior = document.querySelectorAll(".input-senior");
let tickets__total = document.querySelector(".tickets__total");
let overviewTotal = document.querySelector(".overview-total-total");

let overviewBasic = document.querySelector(".overview-basic-amount");
let overviewSenior = document.querySelector(".overview-senior-amount");

let basicTotal = document.querySelector(".overview-basic-total");
let seniorTotal = document.querySelector(".overview-senior-total");

let bookBtn = document.getElementById('overview-book');

function createRipple(event) {
  const button = event.currentTarget;
  let posBtn = button.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight) / 5;
  const radius = diameter;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - posBtn.x - 20}px`;
  circle.style.top = `${event.clientY - posBtn.y}px`;
  circle.classList.add("ripple");
  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

function changeTicketsAmount(event) {
  if (
    event.className == "tickets__btn minus-basic" &&
    inputBasic[0].value > 0
  ) {
    inputBasic[0].value--;
    inputBasic[1].value--;
  } else if (
    event.className == "tickets__btn plus-basic" &&
    inputBasic[0].value < 20
  ) {
    inputBasic[0].value++;
    inputBasic[1].value++;
  } else if (
    event.className == "tickets__btn minus-senior" &&
    inputSenior[0].value > 0
  ) {
    inputSenior[0].value--;
    inputSenior[1].value--;
  } else if (
    event.className == "tickets__btn plus-senior" &&
    inputSenior[0].value < 20
  ) {
    inputSenior[0].value++;
    inputSenior[1].value++;
  }
  tickets__total.innerHTML = `Total €${
    inputBasic[0].value * 20 + inputSenior[0].value * 10
  }`;
  overviewTotal.innerHTML = `${
    inputBasic[0].value * 20 + inputSenior[0].value * 10
  } €`;
  basicTotal.innerHTML = `${inputBasic[0].value * 20} €`;
  seniorTotal.innerHTML = `${inputSenior[0].value * 10} €`;
  overviewBasic.innerHTML = inputBasic[0].value;
  overviewSenior.innerHTML = inputSenior[0].value;
}

function openModal() {
  modal.style.display = "flex";
  modal.animate(
    [
      {
        transform: "translateX(-100%)",
      },
      {
        transform: "translateX(0)",
      },
    ],
    { duration: 400 }
  );
}
function closeModal() {
  modal.animate(
    [
      {
        transform: "translateX(0)",
      },
      {
        transform: "translateX(-100%)",
      },
    ],
    { duration: 400 }
  );
  setTimeout(() => {
    modal.style.display = "none";
  }, 400);
}

bookBtn.addEventListener('click', createRipple);
ticketsBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.className == "modal") closeModal();
});
