const keys = {
  //operations
  divisionButton: document.querySelector(".divisionButton"),
  multiplyButton: document.querySelector(".multiplyButton"),
  minusButton: document.querySelector(".minusButton"),
  sumButton: document.querySelector(".sumButton"),

  //numbers
  nine: document.querySelector(".nine"),
  eight: document.querySelector(".eight"),
  seven: document.querySelector(".seven"),
  six: document.querySelector(".six"),
  five: document.querySelector(".five"),
  four: document.querySelector(".four"),
  three: document.querySelector(".three"),
  two: document.querySelector(".two"),
  one: document.querySelector(".one"),
  zero: document.querySelector(".zero"),

  //point
  point: document.querySelector(".point"),
};

//select the input to show the informations on it
let screen = document.querySelector(".screen");

// for in to select all items with way less lines of code
// this one for ON CLICK
let lastWasOperator = false;
for (let i in keys) {
  document.querySelector(`.${i}`).addEventListener("click", () => {
    // if the button pressed was + or - or / or * and the last operator = false
    // it means like, if i didn't press one of these buttons yet, then show it
    // on screen
    if (
      (keys[i].innerHTML == "+" && lastWasOperator == false) ||
      (keys[i].innerHTML == "-" && lastWasOperator == false) ||
      (keys[i].innerHTML == "/" &&
        lastWasOperator == false &&
        screen.value !== "") ||
      (keys[i].innerHTML == "*" &&
        lastWasOperator == false &&
        screen.value !== "") ||
      (keys[i].innerHTML == "." &&
        lastWasOperator == false &&
        screen.value !== "")
    ) {
      //show it on screen
      screen.value += keys[i].innerHTML;
      // and then make the lastoperator = true, meaning basically that i typed
      // + - / or *
      lastWasOperator = true;
      // so this being true make impossible type it more then once together....
      // so we cant have like 5 + 5 +++ 2 ++2, this can't happen of course

      //But i can type any number anyway
    } else if (
      keys[i].innerHTML == "0" ||
      keys[i].innerHTML == "1" ||
      keys[i].innerHTML == "2" ||
      keys[i].innerHTML == "3" ||
      keys[i].innerHTML == "4" ||
      keys[i].innerHTML == "5" ||
      keys[i].innerHTML == "6" ||
      keys[i].innerHTML == "7" ||
      keys[i].innerHTML == "8" ||
      keys[i].innerHTML == "9"
    ) {
      screen.value += keys[i].innerHTML;
      // then when i type a number show it on screen how many times i typed,
      // and set lastwasoperator to false, meaning that i can type again
      // operators, so i can type again, + - * /......
      // and this just become a endless cycle...
      lastWasOperator = false;
    }
  });
}

//RESET THE SCREEN ON CLICK
const resetButton = document
  .querySelector(".resetButton")
  .addEventListener("click", () => {
    screen.value = "";
    lastWasOperator = false;
  });

// EQUAL BUTTON ON CLICK
const equalButton = document
  .querySelector(".equalButton")
  .addEventListener("click", () => {
    if (screen.value == "+" || screen.value == "-") {
      screen.value = "";
    }
    if (screen.value.length > 33) {
      screen.value = "error: limit of 32 numbers";
    }
    if (
      (lastWasOperator == false &&
        screen.value !== "" &&
        screen.value.includes("+")) ||
      screen.value.includes("-") ||
      screen.value.includes("/") ||
      screen.value.includes("*")
    ) {
      screen.value = eval(screen.value);
      // else if the last one pressed was an operator then i want u to remove
      // this operator and gimme the result
    } else if (lastWasOperator == true && screen.value !== "") {
      // this slice will basically remove the last value that i pressed, if it was
      // + - / or *, and then make the operation and gimme the result
      screen.value = eval(screen.value.slice(0, -1));
    }
  });

// this one for KEYBOARD
document.body.addEventListener("keyup", (event) => {
  if (
    (event.key == "+" && lastWasOperator == false) ||
    (event.key == "-" && lastWasOperator == false) ||
    (event.key == "/" && lastWasOperator == false && screen.value !== "") ||
    (event.key == "*" && lastWasOperator == false && screen.value !== "") ||
    (event.key == "." && lastWasOperator == false && screen.value !== "")
  ) {
    screen.value += event.key;
    lastWasOperator = true;
  } else if (
    event.key == "0" ||
    event.key == "1" ||
    event.key == "2" ||
    event.key == "3" ||
    event.key == "4" ||
    event.key == "5" ||
    event.key == "6" ||
    event.key == "7" ||
    event.key == "8" ||
    event.key == "9"
  ) {
    screen.value += event.key;
    lastWasOperator = false;
  }
});

// RESET THE SCREEN WITH ESC
const keyReset = document.body.addEventListener("keyup", (event) => {
  if (event.key == "Escape") {
    screen.value = "";
    lastWasOperator = false;
  }
});

// Delete just the last one typed, backspace standard
const deleteOnce = document.body.addEventListener("keyup", (event) => {
  if (event.key == "Backspace") {
    screen.value = screen.value.slice(0, -1);
    lastWasOperator = false;
  }
});

// SEE THE RESULT WITH ENTER
const keyResult = document.body.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (screen.value == "+" || screen.value == "-") {
      screen.value = "";
    }
    if (screen.value.length > 33) {
      screen.value = "error: limit of 32 numbers";
    }

    if (
      event.key == "Enter" &&
      lastWasOperator == true &&
      screen.value !== ""
    ) {
      screen.value = eval(screen.value.slice(0, -1));
    } else if (
      event.key == "Enter" &&
      lastWasOperator == false &&
      screen.value !== ""
    ) {
      if (
        screen.value.includes("+") ||
        screen.value.includes("-") ||
        screen.value.includes("*") ||
        screen.value.includes("/")
      ) {
        screen.value = eval(screen.value);
      }
    }
  }
});
