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

  calculator.dataset.previousButtonType = buttonType;
})