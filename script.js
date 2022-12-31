const CURRENT_NUMBERS = ["", "", ""];
const DISPLAY = document.querySelector("#display-view");
const EQUAL = document.querySelector("#equals");
const NUMBERS = document.querySelectorAll(".number");
const OPERATORS = document.querySelectorAll(".operator");
const PATTERN = /[0-9]+[\+\-\*\/]{1}[0-9]+/;
const CLEAR = document.querySelector("#clear");
CLEAR.addEventListener("click", () => clear());
let opExists = false;

NUMBERS.forEach((number) => {
  number.addEventListener("click", () =>
    putNumber(number.getAttribute("value"))
  );
});
OPERATORS.forEach((operator) => {
  operator.addEventListener("click", () =>
    handleOperator(operator.getAttribute("value"))
  );
});
/////////////FUNCTIONS/////////////
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b == 0) {
    return "Error";
  } else {
    return a / b;
  }
}
function operate(num1, operator, num2) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = substract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      result = 0;
      break;
  }
  DISPLAY.textContent = result;
  opExists = false;
}
function clear() {
  DISPLAY.textContent = "";
  opExists = false;
}
const putNumber = function (numValue) {
  DISPLAY.textContent += numValue;
};

const handleOperator = function (opValue) {
  if (DISPLAY.textContent.match(PATTERN) && opValue != "=") {
    CURRENT_NUMBERS[0] = DISPLAY.textContent;
    CURRENT_NUMBERS[2] = DISPLAY.textContent.substring(
      DISPLAY.textContent.indexOf(CURRENT_NUMBERS[1]) + 1
    );
    operate(
      parseFloat(CURRENT_NUMBERS[0]),
      CURRENT_NUMBERS[1],
      parseFloat(CURRENT_NUMBERS[2])
    );
    CURRENT_NUMBERS[1] = opValue;
    opExists = true;
    DISPLAY.textContent += opValue;
  } else if (DISPLAY.textContent.match(PATTERN) && opValue == "=") {
    CURRENT_NUMBERS[0] = DISPLAY.textContent.substring(
      0,
      DISPLAY.textContent.indexOf(CURRENT_NUMBERS[1])
    );
    CURRENT_NUMBERS[2] = DISPLAY.textContent.substring(
      DISPLAY.textContent.indexOf(CURRENT_NUMBERS[1]) + 1
    );
    operate(
      parseFloat(CURRENT_NUMBERS[0]),
      CURRENT_NUMBERS[1],
      parseFloat(CURRENT_NUMBERS[2])
    );
  } else if (
    DISPLAY.textContent.length > 0 &&
    opValue != "=" &&
    opExists == false
  ) {
    CURRENT_NUMBERS[0] = DISPLAY.textContent;
    CURRENT_NUMBERS[1] = opValue;
    DISPLAY.textContent += opValue;
    opExists = true;
  } else {
    return;
  }
};
//HAY QUE CONTROLAR QUE NO SE PUEDA PONER MAS DE UN PUNTO POR NUMERO
//const POINT = document.querySelector("#punto");
//let pointExists = false;
