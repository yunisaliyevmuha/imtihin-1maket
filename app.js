
let inputEl = document.querySelectorAll("input");
const errorMessage = document.querySelectorAll(".error_message");

const yearsEl = document.querySelector("#years");
const monthEl = document.querySelector("#months");
const daysEl = document.querySelector("#days");
const buttonEl = document.getElementById("calcBtn");

// get the current Date

const dateNow = new Date();
let year = dateNow.getFullYear();
let month = dateNow.getMonth() + 1;
let day = dateNow.getDate();

inputEl[0].addEventListener("input", (e) => {
  let value = e.target.value;

  if (value < 30) {
    if (value == 0) {
      value = 1;
    }
    value = value;
  } else if (value > 30) {
    value = 30;
  }

  e.target.value = value;
});

inputEl[1].addEventListener("input", (e) => {
  let value = e.target.value;

  if (value == 0) {
    value = 1;
  }

  if (value < 2022) {
    value = value;
  } else if (value > year) {
    e.target.value = value;
  }

  e.target.value = value;
});

buttonEl.addEventListener("click", () => {
  let isEmpty = false;

  inputEl.forEach((input) => {
    if (input.value.trim() === "") {
      isEmpty = true;
      input.nextSibling.nextSibling.innerHTML = "Enter a Number";
      input.style.border = "1px solid red";
    }
  });

  if (!isEmpty) {
    for (let i = 0; i < inputEl.length; i++) {
      inputEl[i].nextSibling.nextSibling.innerHTML = "";
      inputEl[i].style.border = "1px solid #ececec";
    }
  }

  const birthdate = `${inputEl[2].value}-${inputEl[1].value}-${inputEl[0].value}`;
  const age = calAge(birthdate);

  yearsEl.innerHTML = age.year;
  monthEl.innerHTML = age.month;
  daysEl.innerHTML = age.days;
});

// calculate age
function calAge(birthDate) {
  const now = new Date();
  const birth = new Date(birthDate);

  let age = {};

  let yearDiff = now.getFullYear() - birth.getFullYear();
  let monthDiff = now.getMonth() - birth.getMonth();
  let dayDiff = now.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    yearDiff--;
    monthDiff += 12;
  }

  let daysInLastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
  ).getDate();

  if (dayDiff < 0) {
    dayDiff += daysInLastMonth;
    monthDiff--;
  }

  let totalDays = yearDiff * 365 + monthDiff * daysInLastMonth + dayDiff;
  age.year = Math.floor(totalDays / 365);
  totalDays = totalDays % 365;
  age.month = Math.floor(totalDays / daysInLastMonth);
  totalDays = totalDays % daysInLastMonth;
  age.days = totalDays;

  return age;
}