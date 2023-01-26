const CURRENT_NUMBERS = ["", "", ""];
const DISPLAY = document.querySelector("#display-view");
const NUMBERS = document.querySelectorAll(".number");
const OPERATORS = document.querySelectorAll(".operator");
const PATTERN = /[0-9]+[+\-*/]{1}[0-9]+/;
const CLEAR = document.querySelector("#clear");

let opExists = false;
let dotInFirst = 0;
let dotInSecond = 0;
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
  if (b === 0) {
    return "Error";
  }
  return a / b;
}
function operate(num1, operator, num2) {
  let result = 0;
  dotInFirst = 0;
  dotInSecond = 0;
  switch (operator) {
    case "+":
      result = Math.round(add(num1, num2) * 100 + Number.EPSILON) / 100;
      break;
    case "-":
      result = Math.round(substract(num1, num2) * 100 + Number.EPSILON) / 100;
      break;
    case "*":
      result = Math.round(multiply(num1, num2) * 100 + Number.EPSILON) / 100;
      break;
    case "/":
      result = Math.round(divide(num1, num2) * 100 + Number.EPSILON) / 100;
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
  dotInFirst = 0;
  dotInSecond = 0;
}
CLEAR.addEventListener("click", () => clear());
const putNumber = function (numValue) {
  if (dotInFirst >= 1 && numValue === "." && CURRENT_NUMBERS[1] === "") {
    return;
  } else if (dotInSecond >= 1 && numValue === ".") {
    return;
  }
  if (numValue === ".") {
    dotInFirst += 1;
  }
  if (CURRENT_NUMBERS[1] !== "" && numValue === ".") {
    dotInSecond += 1;
  }
  DISPLAY.textContent += numValue;
};
const handleOperator = function (opValue) {
  if (
    DISPLAY.textContent.match(PATTERN) &&
    opValue !== "=" &&
    opValue !== "Enter"
  ) {
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
  } else if (
    DISPLAY.textContent.match(PATTERN) &&
    (opValue === "=" || opValue === "Enter")
  ) {
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
    opValue !== "=" &&
    opValue !== "Enter" &&
    opExists === false
  ) {
    CURRENT_NUMBERS[0] = DISPLAY.textContent;
    CURRENT_NUMBERS[1] = opValue;
    DISPLAY.textContent += opValue;
    opExists = true;
  } else {
    return;
  }
};
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
const numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operatorArray = ["+", "-", "*", "/", "=", "Enter"];
window.addEventListener("keydown", (e) => {
  if (numberArray.includes(e.key)) {
    console.log(e.key);
    putNumber(e.key);
  } else if (operatorArray.includes(e.key)) {
    handleOperator(e.key);
    console.log(e.key);
  } else if (e.key === "Delete") {
    clear();
  }
});
