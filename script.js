const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display');
const calculatorButtonsDiv = document.querySelector('.calculator__keys');

calculatorButtonsDiv.addEventListener('click', (event) => {
  if (!event.target.closest('button')) return;
  const button = event.target;
  const { buttonType, key } = button.dataset;
  const { previousButtonType } = calculator.dataset;
  const displayValue = display.textContent;
  
  if (buttonType === 'number') {
    if (displayValue === '0') {
      display.textContent = key;
    } else {
      display.textContent = displayValue + key;
    }

    if (previousButtonType === 'operator') {
      display.textContent = key;
    }
  }

  if (buttonType === 'decimal') {
    if (!displayValue.includes('.')) {
      display.textContent = displayValue + '.';
    }
  }

  if (buttonType === 'operator') {
    calculator.dataset.firstValue = displayValue;
    calculator.dataset.operator = key;
  }

  if (buttonType === 'equal') {
    const firstValue = +calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayValue;

    if (typeof firstValue === 'number' && operator) {
      let result;
      if (operator === 'plus') result = firstValue + secondValue;
      if (operator === 'minus') result = firstValue - secondValue;
      if (operator === 'times') result = firstValue * secondValue;
      if (operator === 'divide') result = firstValue / secondValue;


      display.textContent = result;
    }

  }

  if (buttonType !== 'clear') {
    const clearButton = calculator.querySelector('[data-key="clear"]');
    clearButton.textContent = 'CE';
  }

  if (buttonType === 'clear') {
    if (button.textContent === 'AC') {
      delete calculator.dataset.firstValue;
      delete calculator.dataset.operator;
    }
    display.textContent = '0';
    button.textContent = 'AC';
  }

  if (buttonType === 'undo') {
    if (displayValue !== '0') {
      const remove = display.textContent.substring(0, display.textContent.length - 1);
      display.textContent = remove;
    }
    if (display.textContent === '') {
      display.textContent = '0';
    }
  }

  calculator.dataset.previousButtonType = buttonType;
})

//Testing 

// function getDisplayValue() {
//   document.querySelector('.calculator__display').textContent;
// }

// console.log(getDisplayValue())