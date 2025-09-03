const form = document.querySelector(".card-form");
const cardholderNameInput = document.querySelector("#cardholder-name");
const cardNumberInput = document.querySelector("#card-number");
const expireMonthInput = document.querySelector("#expire-month");
const expireYearInput = document.querySelector("#expire-year");
const cvcInput = document.querySelector("#cvc");

const cardFrontName = document.querySelector(".card-front-name");
const cardFrontContent = document.querySelector(".card-front-content");
const cardFrontDate = document.querySelector(".card-front-date");
const cardBackCvc = document.querySelector(".card-cvc");

const cardholderNameError = document.querySelector(".cardholder-name-error");
const cardNumberError = document.querySelector(".card-number-error");
const cardExpireMonthError = document.querySelector(".card-expire-month-error");
const cardExpireYearError = document.querySelector(".card-expire-year-error");
const cvcError = document.querySelector(".cvc-error");
const secondStepContainer = document.querySelector(".second-step-container");

const forbidenCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "/", ".", ",", " "];

let isSubmited = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  isSubmited = true;

  const nameIsValid = validateName(cardholderNameInput.value);
  const numberIsValid = validateNumber(cardNumberInput.value);
  const monthIsValid = validateExpireMonth(expireMonthInput.value);
  const yearIsValid = validateExpireYear(expireYearInput.value);
  const cvcIsValid = validateCvc(cvcInput.value);

  if (nameIsValid && numberIsValid && monthIsValid && yearIsValid && cvcIsValid) {
    form.classList.add("hide");
    secondStepContainer.classList.remove("hide");
  }
});

// -------- Name --------
cardholderNameInput.addEventListener("input", () => {
  if (cardholderNameInput.value.length === 0) {
    cardFrontName.innerText = "Jane Appleseed";
  } else {
    cardFrontName.innerText = cardholderNameInput.value;
  }
  if (isSubmited) validateName(cardholderNameInput.value);
});

function validateName(name) {
  cardholderNameError.classList.add("hide");

  if (name.length === 0) {
    cardholderNameError.classList.remove("hide");
    cardholderNameError.innerText = "this field is required";
    return false;
  }

  for (let i = 0; i < name.length; i++) {
    if (forbidenCharacters.includes(name[i]) || !isNaN(name[i])) {
      cardholderNameError.classList.remove("hide");
      cardholderNameError.innerText = "Must contain only letters";
      return false;
    }
  }

  if (name.length > 256) {
    cardholderNameError.classList.remove("hide");
    cardholderNameError.innerText = "Maximum 256 characters";
    return false;
  }

  return true;
}

// -------- Card Number --------
cardNumberInput.addEventListener("input", () => {
  let rawNumber = cardNumberInput.value.replaceAll(" ", "");
  let formattedNumber = "";

  for (let i = 0; i < rawNumber.length; i++) {
    if (i > 0 && i % 4 === 0) formattedNumber += " ";
    formattedNumber += rawNumber[i];
  }

  cardNumberInput.value = formattedNumber;
  cardFrontContent.innerText = formattedNumber.length === 0 ? "0000 0000 0000 0000" : formattedNumber;

  if (isSubmited) validateNumber(cardNumberInput.value);
});

function validateNumber(number) {
  cardNumberError.classList.add("hide");

  const plainNumber = number.replaceAll(" ", "");

  if (plainNumber.length === 0) {
    cardNumberError.classList.remove("hide");
    cardNumberError.innerText = "this field is required";
    return false;
  }

  if (isNaN(plainNumber)) {
    cardNumberError.classList.remove("hide");
    cardNumberError.innerText = " Numbers only";
    return false;
  }

  if (plainNumber.length > 16) {
    cardNumberError.classList.remove("hide");
    cardNumberError.innerText = "Maximum 16 digits";
    return false;
  }

  return true;
}

// -------- Expire Month --------
expireMonthInput.addEventListener("input", () => {
  if (expireMonthInput.value.length > 2) expireMonthInput.value = expireMonthInput.value.slice(0, 2);
  updateDateOnCard();
  if (isSubmited) validateExpireMonth(expireMonthInput.value);
});

function validateExpireMonth(month) {
  cardExpireMonthError.classList.add("hide");

  if (month.length === 0) {
    cardExpireMonthError.classList.remove("hide");
    cardExpireMonthError.innerText = "this field is required";
    return false;
  }

  if (isNaN(month) || Number(month) < 1 || Number(month) > 12) {
    cardExpireMonthError.classList.remove("hide");
    cardExpireMonthError.innerText = "Invalid month";
    return false;
  }

  return true;
}

// -------- Expire Year --------
expireYearInput.addEventListener("input", () => {
  if (expireYearInput.value.length > 2) expireYearInput.value = expireYearInput.value.slice(0, 2);
  updateDateOnCard();
  if (isSubmited) validateExpireYear(expireYearInput.value);
});

function validateExpireYear(year) {
  cardExpireYearError.classList.add("hide");

  if (year.length === 0) {
    cardExpireYearError.classList.remove("hide");
    cardExpireYearError.innerText = "this field is required";
    return false;
  }

  if (isNaN(year)) {
    cardExpireYearError.classList.remove("hide");
    cardExpireYearError.innerText = "Numbers only";
    return false;
  }

  return true;
}

function updateDateOnCard() {
  let month = expireMonthInput.value.padStart(2, "0");
  let year = expireYearInput.value.padStart(2, "0");
  cardFrontDate.innerText = `${month}/${year}`;
}

// -------- CVC --------
cvcInput.addEventListener("input", () => {
  if (cvcInput.value.length > 3) cvcInput.value = cvcInput.value.slice(0, 3);
  cardBackCvc.innerText = cvcInput.value.length === 0 ? "000" : cvcInput.value;
  if (isSubmited) validateCvc(cvcInput.value);
});

function validateCvc(cvc) {
  cvcError.classList.add("hide");

  if (cvc.length === 0) {
    cvcError.classList.remove("hide");
    cvcError.innerText = "this field is required";
    return false;
  }

  if (isNaN(cvc)) {
    cvcError.classList.remove("hide");
    cvcError.innerText = "Numbers only";
    return false;
  }

  if (cvc.length > 3) {
    cvcError.classList.remove("hide");
    cvcError.innerText = "Max 3 digits";
    return false;
  }

  return true;
}