// Calculator class
class Calculator {
  constructor(displayScreen) {
    this.displayScreen = displayScreen;
    this.clear();
  }

  // Clear function
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // Delete function
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Append number function
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Choose operation function
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // Compute function
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // Get display number function
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

// Update display function
updateDisplay() {
  const currentOperand = this.getDisplayNumber(this.currentOperand);
  let displayText = '';
  if (this.previousOperand && this.operation) {
    displayText += this.getDisplayNumber(this.previousOperand);
    displayText += ` ${this.operation}`;
  }
  if (currentOperand) {
    displayText += ` ${currentOperand}`;
    /*if (this.currentOperand && this.operation) {
      displayText += '';
    }*/
  }
  this.displayScreen.innerText = displayText;
}



  // Percent function
  percent() {
    if (this.currentOperand === '') return;
    this.currentOperand = parseFloat(this.currentOperand) / 100;
  }
}

// Select elements
const displayScreen = document.querySelector('.display-screen');
const clearBtn = document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
const percentBtn = document.querySelector('.percent');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');

// Create new calculator object
const calculator = new Calculator(displayScreen);

// Add event listeners to buttons
clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

backspaceBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

percentBtn.addEventListener('click', () => {
  calculator.percent();
  calculator.updateDisplay();
});

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});
