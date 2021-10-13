let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close");
let ticketsBtn = document.querySelector(".tickets__total-btn");
let inputBasic = document.querySelectorAll(".input-basic");
let inputSenior = document.querySelectorAll(".input-senior");
let tickets__total = document.querySelector(".tickets__total");
let overviewTotal = document.querySelector(".overview-total-total");

let overviewBasic = document.querySelector(".overview-basic-amount");
let overviewSenior = document.querySelector(".overview-senior-amount");

let basicText = document.querySelector('.overview-basic-text')
let seniorText = document.querySelector('.overview-senior-text')

let basicTotal = document.querySelector(".overview-basic-total");
let seniorTotal = document.querySelector(".overview-senior-total");

let bookBtn = document.getElementById("overview-book");

let dateForm = document.getElementById("booking-date-form");
let overviewDate = document.querySelector(".overview-date");
let dateFormText = document.getElementById("date-form-text");

let timeForm = document.getElementById("booking-time-form");
let overviewTime = document.querySelector(".overview-time");
let timeFormText = document.getElementById("time-form-text");

let typeSelection = document.getElementById("booking-type");
let overviewType = document.querySelector(".overview-type");

let ticketsContainers = document.querySelectorAll(".tickets__container");

let bookingName = document.getElementById("booking-name");
let bookingEmail = document.getElementById("booking-email");
let bookingTel = document.getElementById("booking-tel");
let bookingType = document.getElementById("booking-type");
let bookingEntry = document.querySelector(".booking-entry");

let cardNum = document.getElementById("card-number");
let cardExpMonth = document.getElementById("expiration-date-month");
let cardExpYear = document.getElementById("expiration-date-year");
let cardholder = document.getElementById("cardholder");
let cardCVC = document.getElementById("card-cvc");

class ticketForm {
  date = new Date();
  time = null;
  name = null;
  email = null;
  phone = null;
  type = null;
  amountOfBasicTickets = null;
  amountOfSeniorTickets = null;
  total = null;
  cardNumber = null;
  cardMonth = null;
  cardYear = null;
  cardholder = null;
  cvc = null;
}

let louvreForm = new ticketForm();
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
  ticketsCalc();
}
function ticketsCalc(){
  let cost = 20;
  if(overviewType.innerHTML == 'Temporary exhibition')
    cost = 25;
  else if(overviewType.innerHTML == 'Combined Admission')
    cost = 40;
  tickets__total.innerHTML = `Total €${
    inputBasic[0].value * cost + inputSenior[0].value * cost/2
  }`;
  overviewTotal.innerHTML = `${
    inputBasic[0].value * cost + inputSenior[0].value * cost/2
  } €`;
  basicTotal.innerHTML = `${inputBasic[0].value * cost} €`;
  seniorTotal.innerHTML = `${inputSenior[0].value * cost/2} €`;
  overviewBasic.innerHTML = inputBasic[0].value;
  overviewSenior.innerHTML = inputSenior[0].value;
  basicText.innerHTML = `Basic (${cost} €)`;
  seniorText.innerHTML = `Basic (${cost/2} €)`;
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
function changeType(event) {
  if (
    event.querySelector(".tickets__radio-text").innerHTML !=
    overviewType.innerHTML
  ) {
    overviewType.innerHTML = event.querySelector(
      ".tickets__radio-text"
    ).innerHTML;
  }
  for (let i = 0; i < 4; i++) {
    if (typeSelection.options[i].value == overviewType.innerHTML) {
      typeSelection.options.selectedIndex = i;
    }
  }
  ticketsCalc();
}

function checkValidation() {
  const nameReg = /^[a-zA-Z ]{3,15}$/;
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneReg =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const visaReg = /^(?:4[0-9 ]{15}(?:[0-9 ]{3})?)$/;
  const mastercardReg = /^(?:5[1-5][0-9]{14})$/;
  const cvcReg = /^[0-9]{3}$/;
  if (!bookingName.value.match(nameReg)) {
    let uncorrectName = document.querySelector('.uncorrect-name');
    if(uncorrectName)
    uncorrectName.remove();
    bookingName.style.border = `1px solid red`;
    uncorrectName = document.createElement("div");
    uncorrectName.innerHTML = "Uncorrect name. Example: Vasya Ivanov";
    uncorrectName.classList.add("uncorrect");
    uncorrectName.classList.add("uncorrect-name");
    bookingName.style.marginBottom = 0;
    bookingName.after(uncorrectName);
  } else {
    let uncorrectName = document.querySelector('.uncorrect-name');
    if(uncorrectName)
    uncorrectName.remove();

    bookingName.style.marginBottom = `20px`;
    bookingName.style.border = `1px solid  #303030`;
  }

  if (!bookingEmail.value.match(emailReg)) {
    let uncorrectEmail = document.querySelector('.uncorrect-email');
    if(uncorrectEmail)
    uncorrectEmail.remove();
    bookingEmail.style.border = `1px solid red`;
    uncorrectEmail = document.createElement("div");
    uncorrectEmail.innerHTML = "Uncorrect email. Example: ivanov@mail.ru";
    uncorrectEmail.classList.add("uncorrect");
    uncorrectEmail.classList.add("uncorrect-email");
    bookingEmail.style.marginBottom = 0;
    bookingEmail.after(uncorrectEmail);
  } else {
    let uncorrectEmail = document.querySelector('.uncorrect-email');
    if(uncorrectEmail)
    uncorrectEmail.remove();

    bookingEmail.style.marginBottom = `20px`;
    bookingEmail.style.border = `1px solid  #303030`;
  }

  if (!bookingTel.value.match(phoneReg)) {
    let uncorrectTel = document.querySelector('.uncorrect-tel');
    if(uncorrectTel)
    uncorrectTel.remove();
    bookingTel.style.border = `1px solid red`;
    uncorrectTel = document.createElement("div");
    uncorrectTel.innerHTML = "Uncorrect phone number. Example: 375335698702";
    uncorrectTel.classList.add("uncorrect");
    uncorrectTel.classList.add("uncorrect-tel");
    bookingTel.style.marginBottom = 0;
    bookingTel.after(uncorrectTel);
  } else {
    let uncorrectTel = document.querySelector('.uncorrect-tel');
    if(uncorrectTel)
    uncorrectTel.remove();

    bookingTel.style.marginBottom = `20px`;
    bookingTel.style.border = `1px solid  #303030`;
  }

  if (!dateForm.value) {
    dateForm.style.border = `1px solid red`;
  } else {
    dateForm.style.border = `1px solid  #303030`;
  }

  if (!timeForm.value) {
    timeForm.style.border = `1px solid red`;
  } else {
    timeForm.style.border = `1px solid  #303030`;
  }

  if (!cardNum.value.match(visaReg) && !cardNum.value.match(mastercardReg)) {
    cardNum.style.border = `1px solid red`;
  } else {
    cardNum.style.border = `1px solid  #303030`;
  }

  if (!cardExpMonth.value || cardExpMonth.value < 0) {
    cardExpMonth.style.border = `1px solid red`;
  } else {
    cardExpMonth.style.border = `1px solid  #303030`;
  }
  if (!cardExpYear.value || cardExpYear.value < 0) {
    cardExpYear.style.border = `1px solid red`;
  } else {
    cardExpYear.style.border = `1px solid  #303030`;
  }
  if (!cardholder.value.match(nameReg)) {
    cardholder.style.border = `1px solid red`;
  } else {
    cardholder.style.border = `1px solid  #303030`;
    cardholder.value = cardholder.value.toUpperCase();
  }
  if (!cardCVC.value.match(cvcReg)) {
    cardCVC.style.border = `1px solid red`;
  } else {
    cardCVC.style.border = `1px solid  #303030`;
  }
}
dateForm.addEventListener("change", () => {
  let options = { weekday: "long", month: "long", day: "numeric" };
  let date = new Date(dateForm.value);
  if (date.getTime() > Date.now()) {
    overviewDate.innerHTML = `${date.toLocaleDateString("en-US", options)}`;
    dateFormText.innerHTML = `${dateForm.value}`;
  }
});
timeForm.addEventListener("change", () => {
  let minutes =
    Number((timeForm.value[0] + timeForm.value[1]) * 60) +
    Number(timeForm.value[3] + timeForm.value[4]);
  if (
    parseInt(timeForm.value) <= 18 &&
    parseInt(timeForm.value) >= 9 &&
    minutes % 30 == 0
  ) {
    overviewTime.innerHTML = `${timeForm.value}`;
    timeFormText.innerHTML = `${timeForm.value}`;
  }
});
typeSelection.addEventListener("change", () => {
  if (typeSelection.value != "Tickets type") {
    overviewType.innerHTML = `${typeSelection.value}`;
    for (let i = 0; i < ticketsContainers.length; i++) {
      if (
        ticketsContainers[i].querySelector(".tickets__radio-text").innerHTML ==
        overviewType.innerHTML
      ) {
        ticketsContainers[i].querySelector("input").checked = "checked";
      }
    }
  }
  ticketsCalc();
});

bookBtn.addEventListener("click",createRipple);
bookBtn.addEventListener("click",()=>{
  if (overviewTotal.innerHTML == "0 €") {
    bookingEntry.style.border = `1px solid red`;
  } else {
    bookingEntry.style.border = `1px solid  #303030`;
  }
  checkValidation();
});
ticketsBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.className == "modal") closeModal();
});

bookingName.addEventListener('change',  checkValidation)
bookingEmail.addEventListener('change',  checkValidation)
bookingTel.addEventListener('change',  checkValidation)
dateForm.addEventListener('change',  checkValidation)
timeForm.addEventListener('change',  checkValidation)
cardNum.addEventListener('change',  checkValidation)
cardExpMonth.addEventListener('change',  checkValidation)
cardExpYear.addEventListener('change',  checkValidation)
cardholder.addEventListener('change',  checkValidation)
cardCVC.addEventListener('change',  checkValidation)
